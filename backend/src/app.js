const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importar rutas (se agregarán después)
// const usuariosRoutes = require('./routes/usuarios.routes');
// const publicacionesRoutes = require('./routes/publicaciones.routes');
// const comentariosRoutes = require('./routes/comentarios.routes');

// Usar rutas
// app.use('/api/usuarios', usuariosRoutes);
// app.use('/api/publicaciones', publicacionesRoutes);
// app.use('/api/comentarios', comentariosRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenido a la API de L.V Pastas Frescas' });
});

// Middleware de manejo de errores (se importará después)
// const errorHandler = require('./middlewares/errorHandler');
// app.use(errorHandler);

module.exports = app;
