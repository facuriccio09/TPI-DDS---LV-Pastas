const { Sequelize } = require('sequelize');

// Configuración de la base de datos SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false, // Cambiar a console.log para ver las queries SQL
});

// Función para probar la conexión
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✓ Conexión a la base de datos establecida correctamente.');
  } catch (error) {
    console.error('✗ Error al conectar con la base de datos:', error);
  }
};

// Función para sincronizar modelos
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('✓ Base de datos sincronizada.');
  } catch (error) {
    console.error('✗ Error al sincronizar la base de datos:', error);
  }
};

module.exports = {
  sequelize,
  testConnection,
  syncDatabase,
};
