const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importar rutas
const usuariosRoutes = require('./routes/usuarios.routes');
const publicacionesRoutes = require('./routes/publicaciones.routes');
const comentariosRoutes = require('./routes/comentarios.routes');
const categoriasRoutes = require('./routes/categorias.routes');
const ingredientesRoutes = require('./routes/ingredientes.routes');

// Usar rutas
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/publicaciones', publicacionesRoutes);
app.use('/api/comentarios', comentariosRoutes);
app.use('/api/categorias', categoriasRoutes);
app.use('/api/ingredientes', ingredientesRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ 
    message: 'Bienvenido a la API de L.V Pastas Frescas',
    version: '2.0.0',
    endpoints: {
      usuarios: '/api/usuarios',
      publicaciones: '/api/publicaciones',
      comentarios: '/api/comentarios',
      categorias: '/api/categorias',
      ingredientes: '/api/ingredientes'
    }
  });
});

// Middleware de manejo de errores (debe ir al final)
const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

module.exports = app;
