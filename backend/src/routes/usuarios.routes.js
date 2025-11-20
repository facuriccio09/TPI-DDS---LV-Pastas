const express = require('express');
const router = express.Router();
const { Usuario } = require('../models');
const { verificarToken, esAdmin } = require('../middlewares/auth');

// NOTA: Login y registro ahora se manejan con Keycloak
// Ya no necesitamos endpoints /login y /register

// GET /api/usuarios/perfil - Obtener perfil del usuario autenticado (requiere token)
router.get('/perfil', verificarToken, async (req, res, next) => {
  try {
    res.json({
      usuario: req.usuario
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/usuarios - Obtener todos los usuarios (solo admin)
router.get('/', verificarToken, esAdmin, async (req, res, next) => {
  try {
    const usuarios = await Usuario.findAll({
      order: [['createdAt', 'DESC']]
    });

    res.json({
      total: usuarios.length,
      usuarios
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/usuarios/:id - Obtener un usuario por ID (solo admin)
router.get('/:id', verificarToken, esAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({
        error: 'Usuario no encontrado'
      });
    }

    res.json({
      usuario
    });
  } catch (error) {
    next(error);
  }
});

// PUT /api/usuarios/:id - Actualizar usuario
router.put('/:id', verificarToken, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre, email, password } = req.body;

    // Verificar que el usuario pueda actualizar (solo el mismo usuario o admin)
    if (req.usuario.id !== parseInt(id) && req.usuario.rol !== 'admin') {
      return res.status(403).json({
        error: 'No tienes permisos para actualizar este usuario'
      });
    }

    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({
        error: 'Usuario no encontrado'
      });
    }

    // Actualizar campos
    if (nombre) usuario.nombre = nombre;
    if (email) usuario.email = email;
    if (password) usuario.password = password; // Se encripta con el hook

    await usuario.save();

    res.json({
      message: 'Usuario actualizado exitosamente',
      usuario
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/usuarios/:id - Eliminar usuario (solo admin)
router.delete('/:id', verificarToken, esAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({
        error: 'Usuario no encontrado'
      });
    }

    // En lugar de eliminar, desactivar
    usuario.activo = false;
    await usuario.save();

    res.json({
      message: 'Usuario desactivado exitosamente'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
