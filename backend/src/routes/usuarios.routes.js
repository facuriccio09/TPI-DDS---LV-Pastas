const express = require('express');
const router = express.Router();
// IMPORTANTE: Asegúrate de desestructurar 'sequelize' aquí para usar transacciones
const { Usuario, sequelize } = require('../models');
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
  let t; // Variable para la transacción

  try {
    // 1. Iniciamos la transacción
    t = await sequelize.transaction();

    const { id } = req.params;
    const { nombre, email, password } = req.body;

    // Verificar que el usuario pueda actualizar (solo el mismo usuario o admin)
    if (req.usuario.id !== parseInt(id) && req.usuario.rol !== 'admin') {
      await t.rollback(); // Cancelamos transacción antes de responder
      return res.status(403).json({
        error: 'No tienes permisos para actualizar este usuario'
      });
    }

    // Buscamos el usuario DENTRO de la transacción para asegurar consistencia
    const usuario = await Usuario.findByPk(id, { transaction: t });

    if (!usuario) {
      await t.rollback(); // Cancelamos si no existe
      return res.status(404).json({
        error: 'Usuario no encontrado'
      });
    }

    // Actualizar campos
    if (nombre) usuario.nombre = nombre;
    if (email) usuario.email = email;
    if (password) usuario.password = password; // Se encripta con el hook del modelo

    // 2. Guardamos pasando la transacción
    await usuario.save({ transaction: t });

    // 3. Confirmamos los cambios permanentemente
    await t.commit();

    res.json({
      message: 'Usuario actualizado exitosamente',
      usuario
    });

  } catch (error) {
    // 4. Si ocurre cualquier error, deshacemos los cambios
    if (t) await t.rollback();
    next(error);
  }
});

// DELETE /api/usuarios/:id - Eliminar usuario (solo admin)
router.delete('/:id', verificarToken, esAdmin, async (req, res, next) => {
  let t; // Variable para la transacción

  try {
    // 1. Iniciamos la transacción
    t = await sequelize.transaction();

    const { id } = req.params;

    const usuario = await Usuario.findByPk(id, { transaction: t });

    if (!usuario) {
      await t.rollback(); // Cancelamos si no existe
      return res.status(404).json({
        error: 'Usuario no encontrado'
      });
    }

    // En lugar de eliminar, desactivar
    usuario.activo = false;
    
    // 2. Guardamos pasando la transacción
    await usuario.save({ transaction: t });

    // 3. Confirmamos los cambios
    await t.commit();

    res.json({
      message: 'Usuario desactivado exitosamente'
    });

  } catch (error) {
    // 4. Si ocurre cualquier error, deshacemos los cambios
    if (t) await t.rollback();
    next(error);
  }
});

module.exports = router;