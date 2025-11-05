const Usuario = require('./Usuario');
const Publicacion = require('./Publicacion');
const Comentario = require('./Comentario');

// Definir relaciones entre modelos

// Un Usuario puede tener muchos Comentarios
Usuario.hasMany(Comentario, {
  foreignKey: 'usuarioId',
  as: 'comentarios',
  onDelete: 'CASCADE'
});

// Un Comentario pertenece a un Usuario
Comentario.belongsTo(Usuario, {
  foreignKey: 'usuarioId',
  as: 'usuario'
});

// Una Publicacion puede tener muchos Comentarios
Publicacion.hasMany(Comentario, {
  foreignKey: 'publicacionId',
  as: 'comentarios',
  onDelete: 'CASCADE'
});

// Un Comentario pertenece a una Publicacion
Comentario.belongsTo(Publicacion, {
  foreignKey: 'publicacionId',
  as: 'publicacion'
});

module.exports = {
  Usuario,
  Publicacion,
  Comentario
};
