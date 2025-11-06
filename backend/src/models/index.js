const Usuario = require('./Usuario');
const Publicacion = require('./Publicacion');
const Comentario = require('./Comentario');
const Categoria = require('./Categoria');
const Ingrediente = require('./Ingrediente');
const PublicacionIngrediente = require('./PublicacionIngrediente');

// Definir relaciones entre modelos

// Relaciones Usuario - Comentario
Usuario.hasMany(Comentario, {
  foreignKey: 'usuarioId',
  as: 'comentarios',
  onDelete: 'CASCADE'
});

Comentario.belongsTo(Usuario, {
  foreignKey: 'usuarioId',
  as: 'usuario'
});

// Relaciones Publicacion - Comentario
Publicacion.hasMany(Comentario, {
  foreignKey: 'publicacionId',
  as: 'comentarios',
  onDelete: 'CASCADE'
});

Comentario.belongsTo(Publicacion, {
  foreignKey: 'publicacionId',
  as: 'publicacion'
});

// Relaciones Categoria - Publicacion
Categoria.hasMany(Publicacion, {
  foreignKey: 'categoriaId',
  as: 'publicaciones',
  onDelete: 'SET NULL'
});

Publicacion.belongsTo(Categoria, {
  foreignKey: 'categoriaId',
  as: 'categoriaInfo'
});

// Relaciones Publicacion - Ingrediente (Muchos a Muchos)
Publicacion.belongsToMany(Ingrediente, {
  through: PublicacionIngrediente,
  foreignKey: 'publicacionId',
  otherKey: 'ingredienteId',
  as: 'ingredientesDetalle'
});

Ingrediente.belongsToMany(Publicacion, {
  through: PublicacionIngrediente,
  foreignKey: 'ingredienteId',
  otherKey: 'publicacionId',
  as: 'publicaciones'
});

module.exports = {
  Usuario,
  Publicacion,
  Comentario,
  Categoria,
  Ingrediente,
  PublicacionIngrediente
};
