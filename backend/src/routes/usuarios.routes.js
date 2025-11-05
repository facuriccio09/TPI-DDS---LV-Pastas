const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');
const { verificarToken, esAdmin } = require('../middlewares/auth');

// Generar token JWT
const generarToken = (usuario) => {
  return jwt.sign(
    { 
      id: usuario.id,
      email: usuario.email,
      rol: usuario.rol 
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

// POST /api/usuarios/register - Registrar nuevo usuario
router.post('/register', async (req, res, next) => {
  try {
    const { nombre, email, password, rol } = req.body;

    // Validar que los campos requeridos estén presentes
    if (!nombre || !email || !password) {
      return res.status(400).json({
        error: 'Todos los campos son requeridos (nombre, email, password)'
      });
    }

    // Verificar si el email ya existe
    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(409).json({
        error: 'Este email ya está registrado'
      });
    }

    // Crear el usuario (el password se encripta automáticamente con el hook)
    const nuevoUsuario = await Usuario.create({
      nombre,
      email,
      password,
      rol: rol || 'usuario' // Por defecto 'usuario'
    });

    // Generar token
    const token = generarToken(nuevoUsuario);

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      usuario: nuevoUsuario,
      token
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/usuarios/login - Iniciar sesión
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validar campos
    if (!email || !password) {
      return res.status(400).json({
        error: 'Email y contraseña son requeridos'
      });
    }

    // Buscar usuario por email
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(401).json({
        error: 'Credenciales inválidas'
      });
    }

    // Verificar si el usuario está activo
    if (!usuario.activo) {
      return res.status(401).json({
        error: 'Usuario inactivo'
      });
    }

    // Verificar contraseña
    const passwordValido = await usuario.verificarPassword(password);
    if (!passwordValido) {
      return res.status(401).json({
        error: 'Credenciales inválidas'
      });
    }

    // Generar token
    const token = generarToken(usuario);

    res.json({
      message: 'Inicio de sesión exitoso',
      usuario,
      token
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/usuarios/perfil - Obtener perfil del usuario autenticado
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
