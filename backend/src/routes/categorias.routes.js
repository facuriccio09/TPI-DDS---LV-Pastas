const express = require('express');
const router = express.Router();
const { Categoria, Publicacion } = require('../models');
const { verificarToken, esAdmin } = require('../middlewares/auth');

// GET /api/categorias - Obtener todas las categorías (público)
router.get('/', async (req, res, next) => {
  try {
    const { activo } = req.query;
    
    const where = {};
    if (activo !== undefined) {
      where.activo = activo === 'true';
    }

    const categorias = await Categoria.findAll({
      where,
      include: [{
        model: Publicacion,
        as: 'publicaciones',
        attributes: ['id', 'nombre', 'precio', 'disponible'],
        where: { disponible: true },
        required: false
      }],
      order: [['nombre', 'ASC']]
    });

    res.json({
      total: categorias.length,
      categorias
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/categorias/:id - Obtener una categoría por ID (público)
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const categoria = await Categoria.findByPk(id, {
      include: [{
        model: Publicacion,
        as: 'publicaciones',
        where: { disponible: true },
        required: false
      }]
    });

    if (!categoria) {
      return res.status(404).json({
        error: 'Categoría no encontrada'
      });
    }

    res.json(categoria);
  } catch (error) {
    next(error);
  }
});

// POST /api/categorias - Crear una categoría (requiere admin)
router.post('/', verificarToken, esAdmin, async (req, res, next) => {
  try {
    const { nombre, descripcion, activo } = req.body;

    const categoria = await Categoria.create({
      nombre,
      descripcion,
      activo
    });

    res.status(201).json({
      mensaje: 'Categoría creada exitosamente',
      categoria
    });
  } catch (error) {
    next(error);
  }
});

// PUT /api/categorias/:id - Actualizar una categoría (requiere admin)
router.put('/:id', verificarToken, esAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, activo } = req.body;

    const categoria = await Categoria.findByPk(id);

    if (!categoria) {
      return res.status(404).json({
        error: 'Categoría no encontrada'
      });
    }

    await categoria.update({
      nombre,
      descripcion,
      activo
    });

    res.json({
      mensaje: 'Categoría actualizada exitosamente',
      categoria
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/categorias/:id - Eliminar una categoría (requiere admin)
router.delete('/:id', verificarToken, esAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;

    const categoria = await Categoria.findByPk(id);

    if (!categoria) {
      return res.status(404).json({
        error: 'Categoría no encontrada'
      });
    }

    await categoria.destroy();

    res.json({
      mensaje: 'Categoría eliminada exitosamente'
    });
  } catch (error) {
    next(error);
  }
});

// PATCH /api/categorias/:id/toggle - Activar/Desactivar categoría (requiere admin)
router.patch('/:id/toggle', verificarToken, esAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;

    const categoria = await Categoria.findByPk(id);

    if (!categoria) {
      return res.status(404).json({
        error: 'Categoría no encontrada'
      });
    }

    await categoria.update({
      activo: !categoria.activo
    });

    res.json({
      mensaje: `Categoría ${categoria.activo ? 'activada' : 'desactivada'} exitosamente`,
      categoria
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
