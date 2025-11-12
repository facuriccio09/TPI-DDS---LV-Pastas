const app = require('./app');
const { testConnection, syncDatabase } = require('./db');
const { Usuario, Publicacion, Comentario } = require('./models');

const PORT = process.env.PORT || 3000;

// Iniciar servidor
const startServer = async () => {
  try {
    // Probar conexión a la base de datos
    await testConnection();
    
    // Sincronizar modelos con la base de datos
    await syncDatabase();
    
    // Iniciar servidor Express
    app.listen(PORT, () => {
      console.log(`\n Servidor corriendo en http://localhost:${PORT}`);
      console.log(`API L.V Pastas Frescas iniciada correctamente\n`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

startServer();
