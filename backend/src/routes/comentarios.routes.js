const express = require('express');
const router = express.Router();
const { Comentario, Usuario, Publicacion } = require('../models');
const { verificarToken, esAdmin } = require('../middlewares/auth');

// GET /api/comentarios - Obtener todos los comentarios (público)
router.get('/', async (req, res, next) => {
  try {
    const comentarios = await Comentario.findAll({
      include: [
        {
          model: Usuario,
          as: 'usuario',
          attributes: ['id', 'nombre', 'email']
        },
        {
          model: Publicacion,
          as: 'publicacion',
          attributes: ['id', 'nombre']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json({
      total: comentarios.length,
      comentarios
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/comentarios/publicacion/:publicacionId - Obtener comentarios de una publicación (público)
router.get('/publicacion/:publicacionId', async (req, res, next) => {
  try {
    const { publicacionId } = req.params;

    // Verificar que la publicación existe
    const publicacion = await Publicacion.findByPk(publicacionId);
    if (!publicacion) {
      return res.status(404).json({
        error: 'Publicación no encontrada'
      });
    }

    const comentarios = await Comentario.findAll({
      where: { publicacionId },
      include: [{
        model: Usuario,
        as: 'usuario',
        attributes: ['id', 'nombre']
      }],
      order: [['createdAt', 'DESC']]
    });

    // Calcular calificación promedio
    let calificacionPromedio = null;
    if (comentarios.length > 0) {
      const suma = comentarios.reduce((acc, com) => acc + com.calificacion, 0);
      calificacionPromedio = (suma / comentarios.length).toFixed(1);
    }

    res.json({
      total: comentarios.length,
      calificacionPromedio,
      comentarios
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/comentarios/usuario/:usuarioId - Obtener comentarios de un usuario
router.get('/usuario/:usuarioId', async (req, res, next) => {
  try {
    const { usuarioId } = req.params;

    const comentarios = await Comentario.findAll({
      where: { usuarioId },
      include: [{
        model: Publicacion,
        as: 'publicacion',
        attributes: ['id', 'nombre', 'imagen']
      }],
      order: [['createdAt', 'DESC']]
    });

    res.json({
      total: comentarios.length,
      comentarios
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/comentarios/:id - Obtener un comentario por ID
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const comentario = await Comentario.findByPk(id, {
      include: [
        {
          model: Usuario,
          as: 'usuario',
          attributes: ['id', 'nombre']
        },
        {
          model: Publicacion,
          as: 'publicacion',
          attributes: ['id', 'nombre']
        }
      ]
    });

    if (!comentario) {
      return res.status(404).json({
        error: 'Comentario no encontrado'
      });
    }

    res.json({
      comentario
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/comentarios - Crear nuevo comentario (requiere autenticación)
router.post('/', verificarToken, async (req, res, next) => {
  try {
    const { texto, calificacion, publicacionId } = req.body;
    const usuarioId = req.usuario.id;

    // Validar campos requeridos
    if (!texto || !calificacion || !publicacionId) {
      return res.status(400).json({
        error: 'Los campos texto, calificación y publicacionId son requeridos'
      });
    }

    // Verificar que la publicación existe
    const publicacion = await Publicacion.findByPk(publicacionId);
    if (!publicacion) {
      return res.status(404).json({
        error: 'Publicación no encontrada'
      });
    }

    // Verificar si el usuario ya comentó esta publicación
    const comentarioExistente = await Comentario.findOne({
      where: { usuarioId, publicacionId }
    });

    if (comentarioExistente) {
      return res.status(409).json({
        error: 'Ya has comentado esta publicación. Puedes editar tu comentario existente.'
      });
    }

    const nuevoComentario = await Comentario.create({
      texto,
      calificacion,
      usuarioId,
      publicacionId
    });

    // Obtener el comentario completo con las relaciones
    const comentarioCompleto = await Comentario.findByPk(nuevoComentario.id, {
      include: [
        {
          model: Usuario,
          as: 'usuario',
          attributes: ['id', 'nombre']
        },
        {
          model: Publicacion,
          as: 'publicacion',
          attributes: ['id', 'nombre']
        }
      ]
    });

    res.status(201).json({
      message: 'Comentario creado exitosamente',
      comentario: comentarioCompleto
    });
  } catch (error) {
    next(error);
  }
});

// PUT /api/comentarios/:id - Actualizar comentario (solo el autor o admin)
router.put('/:id', verificarToken, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { texto, calificacion } = req.body;

    const comentario = await Comentario.findByPk(id);

    if (!comentario) {
      return res.status(404).json({
        error: 'Comentario no encontrado'
      });
    }

    // Verificar que el usuario sea el autor o admin
    if (comentario.usuarioId !== req.usuario.id && req.usuario.rol !== 'admin') {
      return res.status(403).json({
        error: 'No tienes permisos para editar este comentario'
      });
    }

    // Actualizar campos
    if (texto !== undefined) comentario.texto = texto;
    if (calificacion !== undefined) comentario.calificacion = calificacion;

    await comentario.save();

    // Obtener el comentario actualizado con las relaciones
    const comentarioActualizado = await Comentario.findByPk(id, {
      include: [
        {
          model: Usuario,
          as: 'usuario',
          attributes: ['id', 'nombre']
        },
        {
          model: Publicacion,
          as: 'publicacion',
          attributes: ['id', 'nombre']
        }
      ]
    });

    res.json({
      message: 'Comentario actualizado exitosamente',
      comentario: comentarioActualizado
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/comentarios/:id - Eliminar comentario (solo el autor o admin)
router.delete('/:id', verificarToken, async (req, res, next) => {
  try {
    const { id } = req.params;

    const comentario = await Comentario.findByPk(id);

    if (!comentario) {
      return res.status(404).json({
        error: 'Comentario no encontrado'
      });
    }

    // Verificar que el usuario sea el autor o admin
    if (comentario.usuarioId !== req.usuario.id && req.usuario.rol !== 'admin') {
      return res.status(403).json({
        error: 'No tienes permisos para eliminar este comentario'
      });
    }

    await comentario.destroy();

    res.json({
      message: 'Comentario eliminado exitosamente'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
