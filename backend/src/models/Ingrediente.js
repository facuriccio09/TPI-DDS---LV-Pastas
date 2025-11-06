const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Ingrediente = sequelize.define('Ingrediente', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: {
        msg: 'El nombre del ingrediente no puede estar vacío'
      },
      len: {
        args: [2, 50],
        msg: 'El nombre debe tener entre 2 y 50 caracteres'
      }
    }
  },
  esAlergeno: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    comment: 'Indica si es un ingrediente alérgeno común (gluten, lactosa, etc.)'
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
  }
}, {
  timestamps: true,
  tableName: 'ingredientes',
});

module.exports = Ingrediente;
