const express = require('express');
const router = express.Router();
const { Publicacion, Comentario, Usuario } = require('../models');
const { verificarToken, esAdmin } = require('../middlewares/auth');

// GET /api/publicaciones - Obtener todas las publicaciones (público)
router.get('/', async (req, res, next) => {
  try {
    const { categoria, disponible, destacado } = req.query;

    // Construir filtros dinámicos
    const where = {};
    if (categoria) where.categoria = categoria;
    if (disponible !== undefined) where.disponible = disponible === 'true';
    if (destacado !== undefined) where.destacado = destacado === 'true';

    const publicaciones = await Publicacion.findAll({
      where,
      include: [{
        model: Comentario,
        as: 'comentarios',
        attributes: ['id', 'calificacion'],
        include: [{
          model: Usuario,
          as: 'usuario',
          attributes: ['nombre']
        }]
      }],
      order: [['createdAt', 'DESC']]
    });

    // Calcular calificación promedio para cada publicación
    const publicacionesConPromedio = publicaciones.map(pub => {
      const pubJSON = pub.toJSON();
      if (pubJSON.comentarios && pubJSON.comentarios.length > 0) {
        const sumaCalificaciones = pubJSON.comentarios.reduce((sum, com) => sum + com.calificacion, 0);
        pubJSON.calificacionPromedio = (sumaCalificaciones / pubJSON.comentarios.length).toFixed(1);
        pubJSON.totalComentarios = pubJSON.comentarios.length;
      } else {
        pubJSON.calificacionPromedio = null;
        pubJSON.totalComentarios = 0;
      }
      return pubJSON;
    });

    res.json({
      total: publicacionesConPromedio.length,
      publicaciones: publicacionesConPromedio
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/publicaciones/:id - Obtener una publicación por ID (público)
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const publicacion = await Publicacion.findByPk(id, {
      include: [{
        model: Comentario,
        as: 'comentarios',
        include: [{
          model: Usuario,
          as: 'usuario',
          attributes: ['id', 'nombre']
        }],
        order: [['createdAt', 'DESC']]
      }]
    });

    if (!publicacion) {
      return res.status(404).json({
        error: 'Publicación no encontrada'
      });
    }

    // Calcular calificación promedio
    const pubJSON = publicacion.toJSON();
    if (pubJSON.comentarios && pubJSON.comentarios.length > 0) {
      const sumaCalificaciones = pubJSON.comentarios.reduce((sum, com) => sum + com.calificacion, 0);
      pubJSON.calificacionPromedio = (sumaCalificaciones / pubJSON.comentarios.length).toFixed(1);
      pubJSON.totalComentarios = pubJSON.comentarios.length;
    } else {
      pubJSON.calificacionPromedio = null;
      pubJSON.totalComentarios = 0;
    }

    res.json({
      publicacion: pubJSON
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/publicaciones - Crear nueva publicación (solo admin)
router.post('/', verificarToken, esAdmin, async (req, res, next) => {
  try {
    const { nombre, descripcion, precio, ingredientes, variantes, imagen, categoria, disponible, destacado } = req.body;

    // Validar campos requeridos
    if (!nombre || !descripcion || !precio || !ingredientes) {
      return res.status(400).json({
        error: 'Los campos nombre, descripción, precio e ingredientes son requeridos'
      });
    }

    const nuevaPublicacion = await Publicacion.create({
      nombre,
      descripcion,
      precio,
      ingredientes,
      variantes: variantes || [],
      imagen,
      categoria: categoria || 'Pastas',
      disponible: disponible !== undefined ? disponible : true,
      destacado: destacado || false
    });

    res.status(201).json({
      message: 'Publicación creada exitosamente',
      publicacion: nuevaPublicacion
    });
  } catch (error) {
    next(error);
  }
});

// PUT /api/publicaciones/:id - Actualizar publicación (solo admin)
router.put('/:id', verificarToken, esAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, precio, ingredientes, variantes, imagen, categoria, disponible, destacado } = req.body;

    const publicacion = await Publicacion.findByPk(id);

    if (!publicacion) {
      return res.status(404).json({
        error: 'Publicación no encontrada'
      });
    }

    // Actualizar campos
    if (nombre !== undefined) publicacion.nombre = nombre;
    if (descripcion !== undefined) publicacion.descripcion = descripcion;
    if (precio !== undefined) publicacion.precio = precio;
    if (ingredientes !== undefined) publicacion.ingredientes = ingredientes;
    if (variantes !== undefined) publicacion.variantes = variantes;
    if (imagen !== undefined) publicacion.imagen = imagen;
    if (categoria !== undefined) publicacion.categoria = categoria;
    if (disponible !== undefined) publicacion.disponible = disponible;
    if (destacado !== undefined) publicacion.destacado = destacado;

    await publicacion.save();

    res.json({
      message: 'Publicación actualizada exitosamente',
      publicacion
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/publicaciones/:id - Eliminar publicación (solo admin)
router.delete('/:id', verificarToken, esAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;

    const publicacion = await Publicacion.findByPk(id);

    if (!publicacion) {
      return res.status(404).json({
        error: 'Publicación no encontrada'
      });
    }

    await publicacion.destroy();

    res.json({
      message: 'Publicación eliminada exitosamente'
    });
  } catch (error) {
    next(error);
  }
});

// PATCH /api/publicaciones/:id/disponibilidad - Cambiar disponibilidad (solo admin)
router.patch('/:id/disponibilidad', verificarToken, esAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { disponible } = req.body;

    if (disponible === undefined) {
      return res.status(400).json({
        error: 'El campo disponible es requerido'
      });
    }

    const publicacion = await Publicacion.findByPk(id);

    if (!publicacion) {
      return res.status(404).json({
        error: 'Publicación no encontrada'
      });
    }

    publicacion.disponible = disponible;
    await publicacion.save();

    res.json({
      message: `Publicación ${disponible ? 'habilitada' : 'deshabilitada'} exitosamente`,
      publicacion
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
