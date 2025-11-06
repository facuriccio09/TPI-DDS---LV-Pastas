const express = require('express');
const router = express.Router();
const { Ingrediente, Publicacion, PublicacionIngrediente } = require('../models');
const { verificarToken, esAdmin } = require('../middlewares/auth');

// GET /api/ingredientes - Obtener todos los ingredientes (público)
router.get('/', async (req, res, next) => {
  try {
    const { esAlergeno } = req.query;
    
    const where = {};
    if (esAlergeno !== undefined) {
      where.esAlergeno = esAlergeno === 'true';
    }

    const ingredientes = await Ingrediente.findAll({
      where,
      order: [['nombre', 'ASC']]
    });

    res.json({
      total: ingredientes.length,
      ingredientes
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/ingredientes/:id - Obtener un ingrediente por ID (público)
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const ingrediente = await Ingrediente.findByPk(id, {
      include: [{
        model: Publicacion,
        as: 'publicaciones',
        attributes: ['id', 'nombre', 'precio'],
        through: {
          attributes: ['cantidad']
        }
      }]
    });

    if (!ingrediente) {
      return res.status(404).json({
        error: 'Ingrediente no encontrado'
      });
    }

    res.json(ingrediente);
  } catch (error) {
    next(error);
  }
});

// GET /api/ingredientes/alergenos/lista - Obtener solo ingredientes alérgenos (público)
router.get('/alergenos/lista', async (req, res, next) => {
  try {
    const alergenos = await Ingrediente.findAll({
      where: { esAlergeno: true },
      order: [['nombre', 'ASC']]
    });

    res.json({
      total: alergenos.length,
      alergenos
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/ingredientes - Crear un ingrediente (requiere admin)
router.post('/', verificarToken, esAdmin, async (req, res, next) => {
  try {
    const { nombre, esAlergeno, descripcion } = req.body;

    const ingrediente = await Ingrediente.create({
      nombre,
      esAlergeno,
      descripcion
    });

    res.status(201).json({
      mensaje: 'Ingrediente creado exitosamente',
      ingrediente
    });
  } catch (error) {
    next(error);
  }
});

// PUT /api/ingredientes/:id - Actualizar un ingrediente (requiere admin)
router.put('/:id', verificarToken, esAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre, esAlergeno, descripcion } = req.body;

    const ingrediente = await Ingrediente.findByPk(id);

    if (!ingrediente) {
      return res.status(404).json({
        error: 'Ingrediente no encontrado'
      });
    }

    await ingrediente.update({
      nombre,
      esAlergeno,
      descripcion
    });

    res.json({
      mensaje: 'Ingrediente actualizado exitosamente',
      ingrediente
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/ingredientes/:id - Eliminar un ingrediente (requiere admin)
router.delete('/:id', verificarToken, esAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;

    const ingrediente = await Ingrediente.findByPk(id);

    if (!ingrediente) {
      return res.status(404).json({
        error: 'Ingrediente no encontrado'
      });
    }

    await ingrediente.destroy();

    res.json({
      mensaje: 'Ingrediente eliminado exitosamente'
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/ingredientes/:id/publicaciones - Asociar ingrediente a una publicación (requiere admin)
router.post('/:id/publicaciones', verificarToken, esAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { publicacionId, cantidad } = req.body;

    const ingrediente = await Ingrediente.findByPk(id);
    const publicacion = await Publicacion.findByPk(publicacionId);

    if (!ingrediente) {
      return res.status(404).json({
        error: 'Ingrediente no encontrado'
      });
    }

    if (!publicacion) {
      return res.status(404).json({
        error: 'Publicación no encontrada'
      });
    }

    await PublicacionIngrediente.create({
      publicacionId,
      ingredienteId: id,
      cantidad
    });

    res.status(201).json({
      mensaje: 'Ingrediente asociado a la publicación exitosamente'
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/ingredientes/:id/publicaciones/:publicacionId - Desasociar ingrediente de publicación (requiere admin)
router.delete('/:id/publicaciones/:publicacionId', verificarToken, esAdmin, async (req, res, next) => {
  try {
    const { id, publicacionId } = req.params;

    const asociacion = await PublicacionIngrediente.findOne({
      where: {
        ingredienteId: id,
        publicacionId
      }
    });

    if (!asociacion) {
      return res.status(404).json({
        error: 'Asociación no encontrada'
      });
    }

    await asociacion.destroy();

    res.json({
      mensaje: 'Ingrediente desasociado de la publicación exitosamente'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
