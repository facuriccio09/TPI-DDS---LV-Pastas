const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Publicacion = sequelize.define('Publicacion', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'El nombre del producto no puede estar vacío'
      },
      len: {
        args: [2, 100],
        msg: 'El nombre debe tener entre 2 y 100 caracteres'
      }
    }
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'La descripción no puede estar vacía'
      },
      len: {
        args: [10, 1000],
        msg: 'La descripción debe tener entre 10 y 1000 caracteres'
      }
    }
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'El precio no puede estar vacío'
      },
      isDecimal: {
        msg: 'El precio debe ser un número válido'
      },
      min: {
        args: [0],
        msg: 'El precio debe ser mayor o igual a 0'
      }
    }
  },
  ingredientes: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Los ingredientes no pueden estar vacíos'
      }
    },
    comment: 'Lista de ingredientes separados por coma'
  },
  variantes: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: [],
    comment: 'Array de variantes del producto (ej: ["Jamón y Queso", "Carne y Verdura"])'
  },
  imagen: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: {
        msg: 'La imagen debe ser una URL válida'
      }
    }
  },
  categoriaId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'categorias',
      key: 'id'
    },
    comment: 'Referencia a la tabla de categorías'
  },
  // Mantener categoria como string para retrocompatibilidad
  categoria: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'Pastas',
    validate: {
      len: {
        args: [2, 50],
        msg: 'La categoría debe tener entre 2 y 50 caracteres'
      }
    }
  },
  disponible: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false
  },
  destacado: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
    comment: 'Indica si el producto se destaca en la página principal'
  }
}, {
  timestamps: true,
  tableName: 'publicaciones',
});

// Método para obtener el precio formateado
Publicacion.prototype.getPrecioFormateado = function() {
  return `$${parseFloat(this.precio).toFixed(2)}`;
};

// Método para obtener ingredientes como array
Publicacion.prototype.getIngredientesArray = function() {
  return this.ingredientes.split(',').map(ing => ing.trim());
};

module.exports = Publicacion;
