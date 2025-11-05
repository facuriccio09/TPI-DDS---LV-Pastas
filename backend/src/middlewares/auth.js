const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');

// Middleware para verificar el token JWT
const verificarToken = async (req, res, next) => {
  try {
    // Obtener el token del header Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'No se proporcionó un token de autenticación'
      });
    }

    // Extraer el token (quitar "Bearer ")
    const token = authHeader.substring(7);

    // Verificar y decodificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Buscar el usuario en la base de datos
    const usuario = await Usuario.findByPk(decoded.id);

    if (!usuario) {
      return res.status(401).json({
        error: 'Usuario no encontrado'
      });
    }

    if (!usuario.activo) {
      return res.status(401).json({
        error: 'Usuario inactivo'
      });
    }

    // Adjuntar el usuario al objeto request
    req.usuario = usuario;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        error: 'Token inválido'
      });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        error: 'Token expirado'
      });
    }
    return res.status(500).json({
      error: 'Error al verificar el token',
      detalle: error.message
    });
  }
};

// Middleware para verificar si el usuario es admin
const esAdmin = (req, res, next) => {
  if (!req.usuario) {
    return res.status(401).json({
      error: 'No autenticado'
    });
  }

  if (req.usuario.rol !== 'admin') {
    return res.status(403).json({
      error: 'Acceso denegado. Se requieren permisos de administrador'
    });
  }

  next();
};

// Middleware para verificar que el usuario sea el propietario del recurso o admin
const esPropiertarioOAdmin = (campoUsuarioId = 'usuarioId') => {
  return (req, res, next) => {
    if (!req.usuario) {
      return res.status(401).json({
        error: 'No autenticado'
      });
    }

    // Si es admin, permitir
    if (req.usuario.rol === 'admin') {
      return next();
    }

    // Verificar si es el propietario
    const recursoUsuarioId = req.body[campoUsuarioId] || req.params[campoUsuarioId];
    
    if (parseInt(recursoUsuarioId) !== req.usuario.id) {
      return res.status(403).json({
        error: 'No tienes permisos para realizar esta acción'
      });
    }

    next();
  };
};

module.exports = {
  verificarToken,
  esAdmin,
  esPropiertarioOAdmin
};
