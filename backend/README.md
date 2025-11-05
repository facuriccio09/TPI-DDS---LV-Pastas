# Backend - L.V Pastas Frescas

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus valores

# Ejecutar en modo desarrollo
npm run dev

# Ejecutar en modo producción
npm start
```

## 📦 Dependencias Instaladas

### Producción
- **express**: Framework web para Node.js
- **sequelize**: ORM para manejo de base de datos
- **sqlite3**: Base de datos SQLite
- **jsonwebtoken**: Generación y verificación de JWT
- **bcryptjs**: Encriptación de contraseñas
- **cors**: Middleware para habilitar CORS
- **dotenv**: Carga de variables de entorno

### Desarrollo
- **nodemon**: Auto-reinicio del servidor en cambios

## 🗂️ Estructura de Carpetas

```
backend/
├── src/
│   ├── models/           # Modelos de Sequelize
│   │   ├── Usuario.js
│   │   ├── Publicacion.js
│   │   └── Comentario.js
│   ├── routes/           # Rutas de la API
│   │   ├── usuarios.routes.js
│   │   ├── publicaciones.routes.js
│   │   └── comentarios.routes.js
│   ├── middlewares/      # Middlewares personalizados
│   │   ├── errorHandler.js
│   │   └── auth.js (a crear)
│   ├── app.js           # Configuración de Express
│   ├── db.js            # Configuración de Sequelize
│   └── server.js        # Punto de entrada
├── .env                 # Variables de entorno (NO commitear)
├── .env.example         # Ejemplo de variables
├── .gitignore
└── package.json
```

## 🔐 Configuración de Variables de Entorno

Crear archivo `.env` en la raíz del backend:

```env
PORT=3000
JWT_SECRET=tu_clave_secreta_muy_segura_aqui_cambiar_en_produccion
JWT_EXPIRES_IN=7d
DB_PATH=./database.sqlite
NODE_ENV=development
```

## 📡 Rutas de la API

### Autenticación
- `POST /api/usuarios/register` - Registro de usuario
- `POST /api/usuarios/login` - Inicio de sesión

### Usuarios
- `GET /api/usuarios` - Obtener todos los usuarios (admin)
- `GET /api/usuarios/:id` - Obtener usuario por ID
- `PUT /api/usuarios/:id` - Actualizar usuario
- `DELETE /api/usuarios/:id` - Eliminar usuario (admin)

### Productos (Publicaciones)
- `GET /api/publicaciones` - Obtener todos los productos
- `GET /api/publicaciones/:id` - Obtener producto por ID
- `POST /api/publicaciones` - Crear producto (admin)
- `PUT /api/publicaciones/:id` - Actualizar producto (admin)
- `DELETE /api/publicaciones/:id` - Eliminar producto (admin)

### Reviews (Comentarios)
- `GET /api/comentarios` - Obtener todos los comentarios
- `GET /api/comentarios/publicacion/:id` - Obtener comentarios de un producto
- `POST /api/comentarios` - Crear comentario (autenticado)
- `PUT /api/comentarios/:id` - Actualizar comentario (propio)
- `DELETE /api/comentarios/:id` - Eliminar comentario (propio o admin)

## 🛡️ Middlewares

### errorHandler.js
Middleware centralizado para manejo de errores.

### auth.js (a crear)
- `verifyToken`: Verifica que el token JWT sea válido
- `isAdmin`: Verifica que el usuario sea administrador

## 💾 Base de Datos

SQLite con Sequelize ORM. La base de datos se crea automáticamente al iniciar el servidor.

### Modelos principales:

**Usuario**
- id (PK)
- nombre
- email (único)
- password (encriptado)
- rol (usuario/admin)
- timestamps

**Publicacion** (Producto)
- id (PK)
- nombre
- descripcion
- precio
- ingredientes
- variantes (JSON)
- imagen
- timestamps

**Comentario** (Review)
- id (PK)
- texto
- calificacion (1-5)
- usuarioId (FK)
- publicacionId (FK)
- timestamps

## 🔧 Scripts Disponibles

```bash
npm start       # Ejecutar en producción
npm run dev     # Ejecutar en desarrollo con nodemon
```

## 📝 Notas de Desarrollo

- Todos los passwords se encriptan con bcryptjs antes de guardar
- Los tokens JWT expiran según JWT_EXPIRES_IN (por defecto 7 días)
- CORS está habilitado para permitir peticiones del frontend
- La base de datos se sincroniza automáticamente con { alter: true }
