const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const { Usuario } = require('../models');

// Configurar cliente JWKS para obtener las claves públicas de Keycloak
const client = jwksClient({
  jwksUri: `${process.env.KEYCLOAK_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/certs`,
  cache: true,
  cacheMaxAge: 86400000 // 24 horas
});

// Función para obtener la clave de firma
function getKey(header, callback) {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) {
      callback(err);
      return;
    }
    const signingKey = key.getPublicKey();
    callback(null, signingKey);
  });
}

// Middleware para verificar el token JWT de Keycloak
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

    // Verificar el token con Keycloak
    // NOTA: Keycloak no siempre incluye 'aud' (audience) en tokens de check-sso
    // Por eso lo hacemos opcional
    jwt.verify(token, getKey, {
      // audience: process.env.KEYCLOAK_CLIENT_ID, // Comentado - opcional para check-sso
      issuer: `${process.env.KEYCLOAK_URL}/realms/${process.env.KEYCLOAK_REALM}`,
      algorithms: ['RS256']
    }, async (err, decoded) => {
      if (err) {
        console.error('❌ Error al verificar token:', err.message);
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({
            error: 'Token expirado'
          });
        }
        return res.status(401).json({
          error: 'Token inválido',
          detalle: err.message
        });
      }
      
      console.log('✅ Token verificado correctamente para:', decoded.email || decoded.preferred_username);

      try {
        // Extraer información del token de Keycloak
        const keycloakId = decoded.sub; // ID único de Keycloak
        const email = decoded.email;
        const nombre = decoded.name || decoded.preferred_username;
        const roles = decoded.realm_access?.roles || [];

        // Buscar o crear usuario en nuestra BD basado en el email
        let usuario = await Usuario.findOne({ where: { email } });

        if (!usuario) {
          // Si el usuario no existe, lo creamos automáticamente
          const rol = roles.includes('admin') ? 'admin' : 'usuario';
          usuario = await Usuario.create({
            nombre,
            email,
            password: 'keycloak-managed', // Password ficticio, no se usa
            rol,
            activo: true
          });
        } else {
          // Actualizar rol si cambió en Keycloak
          const nuevoRol = roles.includes('admin') ? 'admin' : 'usuario';
          if (usuario.rol !== nuevoRol) {
            usuario.rol = nuevoRol;
            await usuario.save();
          }
        }

        if (!usuario.activo) {
          return res.status(401).json({
            error: 'Usuario inactivo'
          });
        }

        // Adjuntar el usuario y los roles al objeto request
        req.usuario = usuario;
        req.keycloakRoles = roles;
        next();
      } catch (dbError) {
        return res.status(500).json({
          error: 'Error al procesar el usuario',
          detalle: dbError.message
        });
      }
    });
  } catch (error) {
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
