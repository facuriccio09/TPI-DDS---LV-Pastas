const express = require('express');
const router = express.Router();
// IMPORTANTE: Agregamos 'sequelize' a la importación
const { Categoria, Publicacion, sequelize } = require('../models');
const { verificarToken, esAdmin } = require('../middlewares/auth');

// --- RUTAS GET (LECTURA - SIN TRANSACCIÓN EXPLÍCITA) ---

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

// --- RUTAS DE ESCRITURA (CON TRANSACCIONES) ---

// POST /api/categorias - Crear una categoría (requiere admin)
router.post('/', verificarToken, esAdmin, async (req, res, next) => {
  let t;
  try {
    t = await sequelize.transaction();

    const { nombre, descripcion, activo } = req.body;

    const categoria = await Categoria.create({
      nombre,
      descripcion,
      activo
    }, { transaction: t });

    await t.commit();

    res.status(201).json({
      mensaje: 'Categoría creada exitosamente',
      categoria
    });
  } catch (error) {
    if (t) await t.rollback();
    next(error);
  }
});

// PUT /api/categorias/:id - Actualizar una categoría (requiere admin)
router.put('/:id', verificarToken, esAdmin, async (req, res, next) => {
  let t;
  try {
    t = await sequelize.transaction();

    const { id } = req.params;
    const { nombre, descripcion, activo } = req.body;

    const categoria = await Categoria.findByPk(id, { transaction: t });

    if (!categoria) {
      await t.rollback();
      return res.status(404).json({
        error: 'Categoría no encontrada'
      });
    }

    await categoria.update({
      nombre,
      descripcion,
      activo
    }, { transaction: t });

    await t.commit();

    res.json({
      mensaje: 'Categoría actualizada exitosamente',
      categoria
    });
  } catch (error) {
    if (t) await t.rollback();
    next(error);
  }
});

// DELETE /api/categorias/:id - Eliminar una categoría (requiere admin)
router.delete('/:id', verificarToken, esAdmin, async (req, res, next) => {
  let t;
  try {
    t = await sequelize.transaction();

    const { id } = req.params;

    const categoria = await Categoria.findByPk(id, { transaction: t });

    if (!categoria) {
      await t.rollback();
      return res.status(404).json({
        error: 'Categoría no encontrada'
      });
    }

    await categoria.destroy({ transaction: t });

    await t.commit();

    res.json({
      mensaje: 'Categoría eliminada exitosamente'
    });
  } catch (error) {
    if (t) await t.rollback();
    next(error);
  }
});

// PATCH /api/categorias/:id/toggle - Activar/Desactivar categoría (requiere admin)
router.patch('/:id/toggle', verificarToken, esAdmin, async (req, res, next) => {
  let t;
  try {
    t = await sequelize.transaction();

    const { id } = req.params;

    const categoria = await Categoria.findByPk(id, { transaction: t });

    if (!categoria) {
      await t.rollback();
      return res.status(404).json({
        error: 'Categoría no encontrada'
      });
    }

    // Actualizamos pasando la transacción
    await categoria.update({
      activo: !categoria.activo
    }, { transaction: t });

    await t.commit();

    res.json({
      mensaje: `Categoría ${categoria.activo ? 'activada' : 'desactivada'} exitosamente`,
      categoria
    });
  } catch (error) {
    if (t) await t.rollback();
    next(error);
  }
});

module.exports = router;