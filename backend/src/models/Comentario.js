const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Comentario = sequelize.define('Comentario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  texto: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'El comentario no puede estar vacío'
      },
      len: {
        args: [5, 500],
        msg: 'El comentario debe tener entre 5 y 500 caracteres'
      }
    }
  },
  calificacion: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'La calificación no puede estar vacía'
      },
      isInt: {
        msg: 'La calificación debe ser un número entero'
      },
      min: {
        args: [1],
        msg: 'La calificación mínima es 1'
      },
      max: {
        args: [5],
        msg: 'La calificación máxima es 5'
      }
    }
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'usuarios',
      key: 'id'
    }
  },
  publicacionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'publicaciones',
      key: 'id'
    }
  }
}, {
  timestamps: true,
  tableName: 'comentarios',
  indexes: [
    {
      // Índice para buscar comentarios por publicación
      fields: ['publicacionId']
    },
    {
      // Índice para buscar comentarios por usuario
      fields: ['usuarioId']
    }
  ]
});

module.exports = Comentario;
