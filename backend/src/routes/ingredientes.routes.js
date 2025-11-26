const express = require('express');
const router = express.Router();
// IMPORTANTE: Agregamos 'sequelize' para poder usar transacciones
const { Ingrediente, Publicacion, PublicacionIngrediente, sequelize } = require('../models');
const { verificarToken, esAdmin } = require('../middlewares/auth');

// --- RUTAS GET (LECTURA - SIN TRANSACCIÓN EXPLÍCITA) ---

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

// --- RUTAS DE ESCRITURA (CON TRANSACCIONES) ---

// POST /api/ingredientes - Crear un ingrediente (requiere admin)
router.post('/', verificarToken, esAdmin, async (req, res, next) => {
  let t;
  try {
    t = await sequelize.transaction();

    const { nombre, esAlergeno, descripcion } = req.body;

    const ingrediente = await Ingrediente.create({
      nombre,
      esAlergeno,
      descripcion
    }, { transaction: t });

    await t.commit();

    res.status(201).json({
      mensaje: 'Ingrediente creado exitosamente',
      ingrediente
    });
  } catch (error) {
    if (t) await t.rollback();
    next(error);
  }
});

// PUT /api/ingredientes/:id - Actualizar un ingrediente (requiere admin)
router.put('/:id', verificarToken, esAdmin, async (req, res, next) => {
  let t;
  try {
    t = await sequelize.transaction();

    const { id } = req.params;
    const { nombre, esAlergeno, descripcion } = req.body;

    const ingrediente = await Ingrediente.findByPk(id, { transaction: t });

    if (!ingrediente) {
      await t.rollback();
      return res.status(404).json({
        error: 'Ingrediente no encontrado'
      });
    }

    await ingrediente.update({
      nombre,
      esAlergeno,
      descripcion
    }, { transaction: t });

    await t.commit();

    res.json({
      mensaje: 'Ingrediente actualizado exitosamente',
      ingrediente
    });
  } catch (error) {
    if (t) await t.rollback();
    next(error);
  }
});

// DELETE /api/ingredientes/:id - Eliminar un ingrediente (requiere admin)
router.delete('/:id', verificarToken, esAdmin, async (req, res, next) => {
  let t;
  try {
    t = await sequelize.transaction();

    const { id } = req.params;

    const ingrediente = await Ingrediente.findByPk(id, { transaction: t });

    if (!ingrediente) {
      await t.rollback();
      return res.status(404).json({
        error: 'Ingrediente no encontrado'
      });
    }

    await ingrediente.destroy({ transaction: t });

    await t.commit();

    res.json({
      mensaje: 'Ingrediente eliminado exitosamente'
    });
  } catch (error) {
    if (t) await t.rollback();
    next(error);
  }
});

// --- MANEJO DE ASOCIACIONES (CRÍTICO PARA INTEGRIDAD) ---

// POST /api/ingredientes/:id/publicaciones - Asociar ingrediente a una publicación (requiere admin)
router.post('/:id/publicaciones', verificarToken, esAdmin, async (req, res, next) => {
  let t;
  try {
    t = await sequelize.transaction();

    const { id } = req.params;
    const { publicacionId, cantidad } = req.body;

    // Buscamos ambos dentro de la transacción para asegurar que existen al momento de vincular
    const ingrediente = await Ingrediente.findByPk(id, { transaction: t });
    const publicacion = await Publicacion.findByPk(publicacionId, { transaction: t });

    if (!ingrediente) {
      await t.rollback();
      return res.status(404).json({ error: 'Ingrediente no encontrado' });
    }

    if (!publicacion) {
      await t.rollback();
      return res.status(404).json({ error: 'Publicación no encontrada' });
    }

    // Creamos la relación en la tabla intermedia
    await PublicacionIngrediente.create({
      publicacionId,
      ingredienteId: id,
      cantidad
    }, { transaction: t });

    await t.commit();

    res.status(201).json({
      mensaje: 'Ingrediente asociado a la publicación exitosamente'
    });
  } catch (error) {
    if (t) await t.rollback();
    next(error);
  }
});

// DELETE /api/ingredientes/:id/publicaciones/:publicacionId - Desasociar ingrediente de publicación (requiere admin)
router.delete('/:id/publicaciones/:publicacionId', verificarToken, esAdmin, async (req, res, next) => {
  let t;
  try {
    t = await sequelize.transaction();

    const { id, publicacionId } = req.params;

    const asociacion = await PublicacionIngrediente.findOne({
      where: {
        ingredienteId: id,
        publicacionId
      },
      transaction: t // Buscamos dentro de la transacción
    });

    if (!asociacion) {
      await t.rollback();
      return res.status(404).json({
        error: 'Asociación no encontrada'
      });
    }

    await asociacion.destroy({ transaction: t });

    await t.commit();

    res.json({
      mensaje: 'Ingrediente desasociado de la publicación exitosamente'
    });
  } catch (error) {
    if (t) await t.rollback();
    next(error);
  }
});

module.exports = router;