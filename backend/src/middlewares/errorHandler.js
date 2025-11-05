// Middleware para manejo centralizado de errores
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Error de validación de Sequelize
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      error: 'Error de validación',
      details: err.errors.map(e => ({
        field: e.path,
        message: e.message
      }))
    });
  }

  // Error de unique constraint de Sequelize
  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({
      error: 'El recurso ya existe',
      details: err.errors.map(e => e.message)
    });
  }

  // Error de autenticación JWT
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'Token inválido'
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: 'Token expirado'
    });
  }

  // Error genérico
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: err.message || 'Error interno del servidor'
  });
};

module.exports = errorHandler;
