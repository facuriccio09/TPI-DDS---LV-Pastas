const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const PublicacionIngrediente = sequelize.define('PublicacionIngrediente', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  publicacionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'publicaciones',
      key: 'id'
    }
  },
  ingredienteId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'ingredientes',
      key: 'id'
    }
  },
  cantidad: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Cantidad o proporción del ingrediente (ej: "200g", "abundante", etc.)'
  }
}, {
  timestamps: true,
  tableName: 'publicaciones_ingredientes',
  indexes: [
    {
      unique: true,
      fields: ['publicacionId', 'ingredienteId']
    }
  ]
});

module.exports = PublicacionIngrediente;
