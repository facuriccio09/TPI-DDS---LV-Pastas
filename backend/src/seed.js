/**
 * Script para poblar la base de datos con datos de prueba
 * Basado en los productos reales de "La Vesubiana"
 * 
 * Para ejecutar: node src/seed.js
 */

require('dotenv').config();
const { sequelize } = require('./db');
const { Usuario, Publicacion, Comentario, Categoria, Ingrediente, PublicacionIngrediente } = require('./models');

// Datos de usuarios de prueba
const usuarios = [
  {
    nombre: 'Admin La Vesubiana',
    email: 'admin@lavesubiana.com',
    password: 'admin123',
    rol: 'admin'
  },
  {
    nombre: 'María González',
    email: 'maria.gonzalez@example.com',
    password: '123456',
    rol: 'usuario'
  },
  {
    nombre: 'Carlos Rodríguez',
    email: 'carlos.rodriguez@example.com',
    password: '123456',
    rol: 'usuario'
  },
  {
    nombre: 'Ana Martínez',
    email: 'ana.martinez@example.com',
    password: '123456',
    rol: 'usuario'
  },
  {
    nombre: 'Juan Pérez',
    email: 'juan.perez@example.com',
    password: '123456',
    rol: 'usuario'
  },
  {
    nombre: 'Laura Fernández',
    email: 'laura.fernandez@example.com',
    password: '123456',
    rol: 'usuario'
  },
  {
    nombre: 'Roberto Silva',
    email: 'roberto.silva@example.com',
    password: '123456',
    rol: 'usuario'
  },
  {
    nombre: 'Patricia López',
    email: 'patricia.lopez@example.com',
    password: '123456',
    rol: 'usuario'
  }
];

// Categorías de productos
const categorias = [
  {
    nombre: 'Pastas Rellenas',
    descripcion: 'Pastas artesanales rellenas con diferentes variedades de rellenos caseros',
    activo: true
  },
  {
    nombre: 'Pastas Sin Relleno',
    descripcion: 'Pastas frescas simples elaboradas diariamente con ingredientes de primera calidad',
    activo: true
  },
  {
    nombre: 'Tapas y Masas',
    descripcion: 'Deliciosas tapas y masas para compartir en cualquier ocasión',
    activo: true
  },
  {
    nombre: 'Salsas',
    descripcion: 'Salsas caseras preparadas con recetas tradicionales italianas',
    activo: true
  }
  
];

// Ingredientes comunes
const ingredientes = [
  { nombre: 'Harina 000', esAlergeno: true, descripcion: 'Harina de trigo refinada' },
  { nombre: 'Huevos frescos', esAlergeno: true, descripcion: 'Huevos de granja' },
  { nombre: 'Sal', esAlergeno: false, descripcion: 'Sal marina fina' },
  { nombre: 'Aceite de oliva', esAlergeno: false, descripcion: 'Aceite de oliva virgen extra' },
  { nombre: 'Ricota', esAlergeno: true, descripcion: 'Queso ricota fresco' },
  { nombre: 'Queso rallado', esAlergeno: true, descripcion: 'Mezcla de quesos duros rallados' },
  { nombre: 'Espinaca', esAlergeno: false, descripcion: 'Espinaca fresca' },
  { nombre: 'Carne picada', esAlergeno: false, descripcion: 'Carne vacuna picada magra' },
  { nombre: 'Pollo', esAlergeno: false, descripcion: 'Pechuga de pollo' },
  { nombre: 'Jamón', esAlergeno: false, descripcion: 'Jamón cocido' },
  { nombre: 'Verduras', esAlergeno: false, descripcion: 'Mezcla de verduras frescas' },
  { nombre: 'Tomate', esAlergeno: false, descripcion: 'Tomate perita maduro' },
  { nombre: 'Cebolla', esAlergeno: false, descripcion: 'Cebolla blanca' },
  { nombre: 'Ajo', esAlergeno: false, descripcion: 'Ajo fresco' },
  { nombre: 'Albahaca', esAlergeno: false, descripcion: 'Albahaca fresca' },
  { nombre: 'Papa', esAlergeno: false, descripcion: 'Papa blanca para ñoquis' },
  { nombre: 'Manteca', esAlergeno: true, descripcion: 'Manteca de primera calidad' },
  { nombre: 'Nuez moscada', esAlergeno: false, descripcion: 'Nuez moscada molida' },
  { nombre: 'Semola', esAlergeno: true, descripcion: 'Sémola de trigo duro' }
];

// Productos basados en la imagen de precios de La Vesubiana
const publicaciones = [
  {
    nombre: 'Ravioles',
    descripcion: 'Deliciosos ravioles artesanales hechos con masa fresca. Disponibles en diferentes variedades de relleno para todos los gustos.',
    precio: 5800.00,
    ingredientes: 'Harina 000, Huevos frescos, Sal, Aceite de oliva, Relleno según variante',
    variantes: [
      'Pollo con Verdura',
      'Carne con Verdura',
      'Verdura y Queso',
      'Jamón Ricota Queso',
      '4 Quesos'
    ],
    imagen: 'https://images.unsplash.com/photo-1587740908075-9e245070dfaa?w=800',
    categoria: 'Pastas Rellenas',
    disponible: true,
    destacado: true
  },
  {
    nombre: 'Sorrentinos',
    descripcion: 'Clásicos sorrentinos con la receta tradicional de La Vesubiana. Pasta fresca rellena de forma redonda con la mejor calidad.',
    precio: 6800.00,
    ingredientes: 'Harina 000, Huevos frescos, Mozzarella, Jamón, Especies aromáticas',
    variantes: [],
    imagen: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800',
    categoria: 'Pastas Rellenas',
    disponible: true,
    destacado: true
  },
  {
    nombre: 'Panzottis',
    descripcion: 'Panzottis artesanales, ravioles de gran tamaño con el sello de calidad de La Vesubiana.',
    precio: 7500.00,
    ingredientes: 'Harina 000, Huevos frescos, Ricota, Espinaca, Nuez moscada, Parmesano',
    variantes: [],
    imagen: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800',
    categoria: 'Pastas Rellenas',
    disponible: true,
    destacado: false
  },
  {
    nombre: 'Ñoquis',
    descripcion: 'Ñoquis de papa tradicionales, suaves y esponjosos. Perfectos para acompañar con tu salsa favorita.',
    precio: 6400.00,
    ingredientes: 'Papa, Harina 000, Huevo, Sal',
    variantes: [],
    imagen: 'https://images.unsplash.com/photo-1611180011110-37e1b5c2c4d5?w=800',
    categoria: 'Pastas Sin Relleno',
    disponible: true,
    destacado: true
  },
  {
    nombre: 'Tallarines',
    descripcion: 'Tallarines frescos cortados artesanalmente. Disponibles en diferentes variedades.',
    precio: 6400.00,
    ingredientes: 'Harina 000, Huevos frescos, Sal, Ingredientes según variante',
    variantes: [
      'Al Huevo',
      'De Espinaca',
      'De Morrón'
    ],
    imagen: 'https://images.unsplash.com/photo-1621947081720-86970823b77a?w=800',
    categoria: 'Pastas Sin Relleno',
    disponible: true,
    destacado: false
  },
  {
    nombre: 'Discos para Empanadas Criollas',
    descripcion: 'Discos de masa para empanadas criollas, listos para rellenar. Masa crocante y deliciosa.',
    precio: 1500.00,
    ingredientes: 'Harina, Grasa, Sal, Agua',
    variantes: [],
    imagen: 'https://images.unsplash.com/photo-1624726175512-19b9baf9fbd1?w=800',
    categoria: 'Tapas y Masas',
    disponible: true,
    destacado: false
  },
  {
    nombre: 'Discos para Empanadas Árabes',
    descripcion: 'Discos de masa para empanadas árabes triangulares, perfectos para preparaciones al horno.',
    precio: 1700.00,
    ingredientes: 'Harina, Aceite, Sal, Agua',
    variantes: [],
    imagen: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800',
    categoria: 'Tapas y Masas',
    disponible: true,
    destacado: false
  },
  {
    nombre: 'Pascualinas',
    descripcion: 'Masa para pascualinas, ideal para preparar esta tradicional tarta argentina.',
    precio: 2700.00,
    ingredientes: 'Harina 000, Aceite, Sal, Agua',
    variantes: [],
    imagen: 'https://images.unsplash.com/photo-1619096252214-ef06c45683e3?w=800',
    categoria: 'Tapas y Masas',
    disponible: true,
    destacado: false
  },
  {
    nombre: 'Discos para Empanadas Copetín',
    descripcion: 'Discos para empanadas copetín por 24 unidades. Empanadas pequeñas perfectas para aperitivos y eventos.',
    precio: 2500.00,
    ingredientes: 'Harina, Manteca, Sal',
    variantes: [],
    imagen: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800',
    categoria: 'Masas y Tapas',
    disponible: true,
    destacado: false
  },
  {
    nombre: 'Pastelitos',
    descripcion: 'Masa para pastelitos tradicionales argentinos, ideal para preparar dulces o salados.',
    precio: 2800.00,
    ingredientes: 'Harina, Grasa, Sal, Agua',
    variantes: [],
    imagen: 'https://images.unsplash.com/photo-1558326567-98ae2405596b?w=800',
    categoria: 'Tapas y Masas',
    disponible: true,
    destacado: false
  },
  {
    nombre: 'Lasañas',
    descripcion: 'Placas de lasaña fresca para preparar este clásico italiano.',
    precio: 2900.00,
    ingredientes: 'Harina 000, Huevos frescos, Sal, Aceite',
    variantes: [],
    imagen: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=800',
    categoria: 'Tapas y Masas',
    disponible: true,
    destacado: false
  },
  {
    nombre: 'Canelones',
    descripcion: 'Placas de canelones frescos, listos para rellenar con tus ingredientes favoritos.',
    precio: 6000.00,
    ingredientes: 'Harina 000, Huevos frescos, Sal',
    variantes: [],
    imagen: 'https://images.unsplash.com/photo-1633964913295-ceb43826a270?w=800',
    categoria: 'Pastas Rellenas',
    disponible: true,
    destacado: false
  }
];

// Salsas disponibles
const salsas = [
  {
    nombre: 'Salsa de Tomate',
    descripcion: 'Salsa de tomate estilo Arcor / Knorr, clásica y tradicional.',
    precio: 1700.00,
    ingredientes: 'Tomate, Cebolla, Ajo, Aceite de oliva, Albahaca',
    variantes: [],
    imagen: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=800',
    categoria: 'Salsas',
    disponible: true,
    destacado: true
  },
  {
    nombre: 'Salsa Tritu',
    descripcion: 'Tomate triturado en botella, base perfecta para tus preparaciones.',
    precio: 2600.00,
    ingredientes: 'Tomate triturado, Aceite, Sal, Especies',
    variantes: [],
    imagen: 'https://images.unsplash.com/photo-1608616955325-6d0de27b4948?w=800',
    categoria: 'Salsas',
    disponible: true,
    destacado: false
  },
  {
    nombre: 'Salsa Casera',
    descripcion: 'Salsa casera con la receta secreta de la casa. La favorita de nuestros clientes.',
    precio: 4500.00,
    ingredientes: 'Tomate, Carne molida, Cebolla, Ajo, Vino, Especies',
    variantes: [],
    imagen: 'https://images.unsplash.com/photo-1627662168835-7b9c59682c7d?w=800',
    categoria: 'Salsas',
    disponible: true,
    destacado: true
  }
];

// Comentarios de ejemplo con variedad
const comentariosTemplate = [
  {
    texto: '¡Excelentes! Las mejores pastas que he probado en mi vida. La calidad es excepcional.',
    calificacion: 5
  },
  {
    texto: 'Muy ricas, la masa está perfecta y el relleno es abundante. Volveré a comprar.',
    calificacion: 5
  },
  {
    texto: 'Buena calidad, aunque el precio es un poco elevado. Pero vale la pena.',
    calificacion: 4
  },
  {
    texto: 'Deliciosas! Se nota que son artesanales. Mi familia quedó encantada.',
    calificacion: 5
  },
  {
    texto: 'Muy buenas, pero esperaba un poco más de cantidad por el precio.',
    calificacion: 4
  },
  {
    texto: 'Simplemente perfectas. La textura de la masa es increíble.',
    calificacion: 5
  },
  {
    texto: 'Excelente calidad. Se nota el trabajo artesanal. Totalmente recomendadas.',
    calificacion: 5
  },
  {
    texto: 'Riquísimas! Compro todas las semanas. Son mi debilidad.',
    calificacion: 5
  },
  {
    texto: 'Muy buenas, aunque a veces el relleno varía un poco en cantidad.',
    calificacion: 4
  },
  {
    texto: 'Las mejores de la zona sin dudas. Calidad garantizada.',
    calificacion: 5
  },
  {
    texto: 'Buenas, pero he probado mejores. Aún así son recomendables.',
    calificacion: 3
  },
  {
    texto: '¡Espectaculares! La masa es súper fresca y el sabor inigualable.',
    calificacion: 5
  },
  {
    texto: 'Muy ricas. El sabor casero que estaba buscando.',
    calificacion: 4
  },
  {
    texto: 'Excelente producto. La relación calidad-precio es justa.',
    calificacion: 5
  },
  {
    texto: 'Buenas pastas, aunque podrían mejorar el packaging.',
    calificacion: 4
  }
];

async function seed() {
  try {
    console.log('🌱 Iniciando seed de la base de datos...\n');

    // Conectar a la base de datos
    await sequelize.authenticate();
    console.log('✓ Conexión establecida\n');

    // Sincronizar modelos (esto eliminará datos existentes)
    console.log('⚠️  Sincronizando base de datos (se eliminarán datos existentes)...');
    await sequelize.sync({ force: true });
    console.log('✓ Base de datos sincronizada\n');

    // Crear usuarios
    console.log('👥 Creando usuarios...');
    const usuariosCreados = await Usuario.bulkCreate(usuarios, { 
      individualHooks: true // IMPORTANTE: Esto ejecuta los hooks de encriptación
    });
    console.log(`✓ ${usuariosCreados.length} usuarios creados\n`);

    // Crear categorías
    console.log('📁 Creando categorías...');
    const categoriasCreadas = await Categoria.bulkCreate(categorias);
    console.log(`✓ ${categoriasCreadas.length} categorías creadas\n`);

    // Crear ingredientes
    console.log('🥬 Creando ingredientes...');
    const ingredientesCreados = await Ingrediente.bulkCreate(ingredientes);
    console.log(`✓ ${ingredientesCreados.length} ingredientes creados\n`);

    // Asignar categorías a las publicaciones existentes
    const categoriasPorNombre = {};
    categoriasCreadas.forEach(cat => {
      categoriasPorNombre[cat.nombre] = cat.id;
    });

    // Actualizar publicaciones con categoriaId
    publicaciones.forEach(pub => {
      if (pub.categoria && categoriasPorNombre[pub.categoria]) {
        pub.categoriaId = categoriasPorNombre[pub.categoria];
      }
    });

    salsas.forEach(salsa => {
      if (categoriasPorNombre['Salsas']) {
        salsa.categoriaId = categoriasPorNombre['Salsas'];
      }
    });

    // Crear publicaciones (productos)
    console.log('🍝 Creando productos de pastas...');
    const todasPublicaciones = [...publicaciones, ...salsas];
    const publicacionesCreadas = await Publicacion.bulkCreate(todasPublicaciones);
    console.log(`✓ ${publicacionesCreadas.length} productos creados\n`);

    // Asociar ingredientes a publicaciones
    console.log('🔗 Asociando ingredientes a productos...');
    const asociaciones = [];
    
    // Ravioles - ingredientes básicos
    const ravioles = publicacionesCreadas.find(p => p.nombre === 'Ravioles');
    if (ravioles) {
      const ingredientesRavioles = ['Harina 000', 'Huevos frescos', 'Sal', 'Ricota', 'Queso rallado'];
      for (const ingNombre of ingredientesRavioles) {
        const ing = ingredientesCreados.find(i => i.nombre === ingNombre);
        if (ing) {
          asociaciones.push({
            publicacionId: ravioles.id,
            ingredienteId: ing.id
          });
        }
      }
    }

    // Sorrentinos
    const sorrentinos = publicacionesCreadas.find(p => p.nombre === 'Sorrentinos');
    if (sorrentinos) {
      const ingredientesSorrentinos = ['Harina 000', 'Huevos frescos', 'Sal', 'Ricota', 'Jamón'];
      for (const ingNombre of ingredientesSorrentinos) {
        const ing = ingredientesCreados.find(i => i.nombre === ingNombre);
        if (ing) {
          asociaciones.push({
            publicacionId: sorrentinos.id,
            ingredienteId: ing.id
          });
        }
      }
    }

    // Panzottis
    const panzottis = publicacionesCreadas.find(p => p.nombre === 'Panzottis');
    if (panzottis) {
      const ingredientesPanzottis = ['Harina 000', 'Huevos frescos', 'Sal', 'Ricota', 'Espinaca'];
      for (const ingNombre of ingredientesPanzottis) {
        const ing = ingredientesCreados.find(i => i.nombre === ingNombre);
        if (ing) {
          asociaciones.push({
            publicacionId: panzottis.id,
            ingredienteId: ing.id
          });
        }
      }
    }

    // Ñoquis
    const noquis = publicacionesCreadas.find(p => p.nombre === 'Ñoquis');
    if (noquis) {
      const ingredientesNoquis = ['Papa', 'Harina 000', 'Huevos frescos', 'Sal', 'Nuez moscada'];
      for (const ingNombre of ingredientesNoquis) {
        const ing = ingredientesCreados.find(i => i.nombre === ingNombre);
        if (ing) {
          asociaciones.push({
            publicacionId: noquis.id,
            ingredienteId: ing.id
          });
        }
      }
    }

    // Tallarines
    const tallarines = publicacionesCreadas.find(p => p.nombre === 'Tallarines');
    if (tallarines) {
      const ingredientesTallarines = ['Harina 000', 'Huevos frescos', 'Sal', 'Aceite de oliva'];
      for (const ingNombre of ingredientesTallarines) {
        const ing = ingredientesCreados.find(i => i.nombre === ingNombre);
        if (ing) {
          asociaciones.push({
            publicacionId: tallarines.id,
            ingredienteId: ing.id
          });
        }
      }
    }

    // Salsa Casera
    const salsaCasera = publicacionesCreadas.find(p => p.nombre === 'Salsa Casera');
    if (salsaCasera) {
      const ingredientesSalsaCasera = ['Tomate', 'Carne picada', 'Cebolla', 'Ajo', 'Albahaca'];
      for (const ingNombre of ingredientesSalsaCasera) {
        const ing = ingredientesCreados.find(i => i.nombre === ingNombre);
        if (ing) {
          asociaciones.push({
            publicacionId: salsaCasera.id,
            ingredienteId: ing.id
          });
        }
      }
    }

    await PublicacionIngrediente.bulkCreate(asociaciones);
    console.log(`✓ ${asociaciones.length} asociaciones de ingredientes creadas\n`);

    // Crear comentarios aleatorios
    console.log('💬 Creando comentarios...');
    const comentarios = [];
    
    // Para cada producto, crear entre 2 y 5 comentarios aleatorios
    for (const publicacion of publicacionesCreadas) {
      const numComentarios = Math.floor(Math.random() * 4) + 2; // 2 a 5 comentarios
      const usuariosDisponibles = [...usuariosCreados].filter(u => u.rol === 'usuario');
      
      // Mezclar usuarios para asignar comentarios aleatorios
      const usuariosAleatorios = usuariosDisponibles
        .sort(() => Math.random() - 0.5)
        .slice(0, numComentarios);

      for (let i = 0; i < numComentarios; i++) {
        const comentarioTemplate = comentariosTemplate[Math.floor(Math.random() * comentariosTemplate.length)];
        comentarios.push({
          texto: comentarioTemplate.texto,
          calificacion: comentarioTemplate.calificacion,
          usuarioId: usuariosAleatorios[i].id,
          publicacionId: publicacion.id
        });
      }
    }

    const comentariosCreados = await Comentario.bulkCreate(comentarios);
    console.log(`✓ ${comentariosCreados.length} comentarios creados\n`);

    // Resumen
    console.log('📊 RESUMEN:\n');
    console.log(`   Usuarios:             ${usuariosCreados.length}`);
    console.log(`   - Admin:              1`);
    console.log(`   - Usuarios:           ${usuariosCreados.length - 1}`);
    console.log(`   Categorías:           ${categoriasCreadas.length}`);
    console.log(`   Ingredientes:         ${ingredientesCreados.length}`);
    console.log(`   - Alérgenos:          ${ingredientesCreados.filter(i => i.esAlergeno).length}`);
    console.log(`   Productos:            ${publicacionesCreadas.length}`);
    console.log(`   - Pastas:             ${publicaciones.length}`);
    console.log(`   - Salsas:             ${salsas.length}`);
    console.log(`   Asociaciones:         ${asociaciones.length}`);
    console.log(`   Comentarios:          ${comentariosCreados.length}\n`);

    // Mostrar credenciales de acceso
    console.log('🔑 CREDENCIALES DE ACCESO:\n');
    console.log('   👨‍💼 ADMIN:');
    console.log('   Email:    admin@lavesubiana.com');
    console.log('   Password: admin123\n');
    console.log('   👤 USUARIO DE PRUEBA:');
    console.log('   Email:    maria.gonzalez@example.com');
    console.log('   Password: 123456\n');

    console.log('✅ Seed completado exitosamente!\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error en el seed:', error);
    process.exit(1);
  }
}

// Ejecutar seed
seed();
