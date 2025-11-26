const express = require('express');
const router = express.Router();
// IMPORTANTE: Importamos 'sequelize' para las transacciones
const { Comentario, Usuario, Publicacion, sequelize } = require('../models');
const { verificarToken, esAdmin } = require('../middlewares/auth');

// --- RUTAS GET (LECTURA - SIN TRANSACCIÓN EXPLÍCITA) ---

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

// GET /api/comentarios/publicacion/:publicacionId
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
        attributes: ['id', 'nombre', 'email']
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

// GET /api/comentarios/usuario/:usuarioId
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

// GET /api/comentarios/:id
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

// --- RUTAS DE ESCRITURA (CON TRANSACCIONES) ---

// POST /api/comentarios - Crear nuevo comentario (requiere autenticación)
router.post('/', verificarToken, async (req, res, next) => {
  let t;
  try {
    t = await sequelize.transaction();

    const { texto, calificacion, publicacionId } = req.body;
    const usuarioId = req.usuario.id;

    // Validar campos requeridos
    if (!texto || !calificacion || !publicacionId) {
      await t.rollback();
      return res.status(400).json({
        error: 'Los campos texto, calificación y publicacionId son requeridos'
      });
    }

    // Verificar que la publicación existe (DENTRO de la transacción)
    const publicacion = await Publicacion.findByPk(publicacionId, { transaction: t });
    if (!publicacion) {
      await t.rollback();
      return res.status(404).json({
        error: 'Publicación no encontrada'
      });
    }

    // Verificar duplicados (DENTRO de la transacción para evitar condiciones de carrera)
    const comentarioExistente = await Comentario.findOne({
      where: { usuarioId, publicacionId },
      transaction: t
    });

    if (comentarioExistente) {
      await t.rollback();
      return res.status(409).json({
        error: 'Ya has comentado esta publicación. Puedes editar tu comentario existente.'
      });
    }

    const nuevoComentario = await Comentario.create({
      texto,
      calificacion,
      usuarioId,
      publicacionId
    }, { transaction: t });

    // Confirmamos la transacción
    await t.commit();

    // NOTA: Hacemos el fetch final FUERA de la transacción (o en una nueva lectura)
    // una vez que los datos ya están confirmados.
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
    if (t) await t.rollback();
    next(error);
  }
});

// PUT /api/comentarios/:id - Actualizar comentario (solo el autor o admin)
router.put('/:id', verificarToken, async (req, res, next) => {
  let t;
  try {
    t = await sequelize.transaction();

    const { id } = req.params;
    const { texto, calificacion } = req.body;

    const comentario = await Comentario.findByPk(id, { transaction: t });

    if (!comentario) {
      await t.rollback();
      return res.status(404).json({
        error: 'Comentario no encontrado'
      });
    }

    // Verificar permisos
    if (comentario.usuarioId !== req.usuario.id && req.usuario.rol !== 'admin') {
      await t.rollback();
      return res.status(403).json({
        error: 'No tienes permisos para editar este comentario'
      });
    }

    // Actualizar campos
    if (texto !== undefined) comentario.texto = texto;
    if (calificacion !== undefined) comentario.calificacion = calificacion;

    await comentario.save({ transaction: t });

    await t.commit();

    // Fetch del comentario actualizado (post-commit)
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
    if (t) await t.rollback();
    next(error);
  }
});

// DELETE /api/comentarios/:id - Eliminar comentario (solo el autor o admin)
router.delete('/:id', verificarToken, async (req, res, next) => {
  let t;
  try {
    t = await sequelize.transaction();

    const { id } = req.params;

    const comentario = await Comentario.findByPk(id, { transaction: t });

    if (!comentario) {
      await t.rollback();
      return res.status(404).json({
        error: 'Comentario no encontrado'
      });
    }

    // Verificar permisos
    if (comentario.usuarioId !== req.usuario.id && req.usuario.rol !== 'admin') {
      await t.rollback();
      return res.status(403).json({
        error: 'No tienes permisos para eliminar este comentario'
      });
    }

    await comentario.destroy({ transaction: t });

    await t.commit();

    res.json({
      message: 'Comentario eliminado exitosamente'
    });
  } catch (error) {
    if (t) await t.rollback();
    next(error);
  }
});

module.exports = router;