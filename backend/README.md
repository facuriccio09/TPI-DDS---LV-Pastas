# Backend - L.V Pastas Frescas

## 🚀 Inicio Rápido

```bash
# 1. Asegurate de que Keycloak esté corriendo (ver README principal)
docker-compose up -d

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus valores

# 4. Ejecutar en modo desarrollo
npm run dev

# 5. Ejecutar en modo producción
npm start
```

## 📦 Dependencias Instaladas

### Producción
- **express**: Framework web para Node.js
- **sequelize**: ORM para manejo de base de datos
- **sqlite3**: Base de datos SQLite
- **keycloak-connect**: Integración con Keycloak
- **jsonwebtoken**: Validación de tokens JWT
- **jwks-rsa**: Validación de claves públicas de Keycloak
- **bcryptjs**: Encriptación de contraseñas (legacy)
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

# Configuración JWT (Deprecado - ahora usamos Keycloak)
JWT_SECRET=facudo_secreto
JWT_EXPIRES_IN=7d

# Configuración de Keycloak (IMPORTANTE)
KEYCLOAK_URL=http://localhost:8080
KEYCLOAK_REALM=lv-pastas
KEYCLOAK_CLIENT_ID=lv-pastas-frontend

# Base de datos
DB_PATH=./database.sqlite
NODE_ENV=development
```

⚠️ **IMPORTANTE:** 
- Asegurate de que Keycloak esté configurado con el realm y client correctos
- Las URLs deben coincidir con tu configuración de Keycloak
- El `KEYCLOAK_CLIENT_ID` debe existir en Keycloak

## 📡 Rutas de la API

### ⚠️ Autenticación con Keycloak
**NOTA:** Los endpoints de login y registro ahora se manejan con Keycloak.
- Login: http://localhost:8080/realms/lv-pastas/account
- Admin Console: http://localhost:8080

### Usuarios
- `GET /api/usuarios/perfil` - Obtener perfil del usuario autenticado (requiere token)
- `GET /api/usuarios` - Obtener todos los usuarios (admin)
- `GET /api/usuarios/:id` - Obtener usuario por ID (admin)
- `PUT /api/usuarios/:id` - Actualizar usuario (propio o admin)
- `DELETE /api/usuarios/:id` - Eliminar usuario (admin)

### Productos (Publicaciones)
- `GET /api/publicaciones` - Obtener todos los productos (público)
  - Query params: `?categoria=Pastas&disponible=true&destacado=true&page=1&limit=9`
- `GET /api/publicaciones/:id` - Obtener producto por ID (público)
- `POST /api/publicaciones` - Crear producto (admin, requiere token)
- `PUT /api/publicaciones/:id` - Actualizar producto (admin, requiere token)
- `DELETE /api/publicaciones/:id` - Eliminar producto (admin, requiere token)
- `PATCH /api/publicaciones/:id/disponibilidad` - Cambiar disponibilidad (admin, requiere token)

### Categorías
- `GET /api/categorias` - Obtener todas las categorías (público)
- `GET /api/categorias/:id` - Obtener categoría por ID (público)
- `POST /api/categorias` - Crear categoría (admin, requiere token)
- `PUT /api/categorias/:id` - Actualizar categoría (admin, requiere token)
- `DELETE /api/categorias/:id` - Eliminar categoría (admin, requiere token)

### Ingredientes
- `GET /api/ingredientes` - Obtener todos los ingredientes (público)
- `GET /api/ingredientes/:id` - Obtener ingrediente por ID (público)
- `POST /api/ingredientes` - Crear ingrediente (admin, requiere token)
- `PUT /api/ingredientes/:id` - Actualizar ingrediente (admin, requiere token)
- `DELETE /api/ingredientes/:id` - Eliminar ingrediente (admin, requiere token)

### Reviews (Comentarios)
- `GET /api/comentarios` - Obtener todos los comentarios (público)
- `GET /api/comentarios/publicacion/:id` - Obtener comentarios de un producto (público)
- `POST /api/comentarios` - Crear comentario (requiere token)
- `PUT /api/comentarios/:id` - Actualizar comentario (propio usuario, requiere token)
- `DELETE /api/comentarios/:id` - Eliminar comentario (propio o admin, requiere token)

### 🔑 Headers Requeridos para Rutas Protegidas
```
Authorization: Bearer <token-de-keycloak>
```

## 🛡️ Middlewares

### errorHandler.js
Middleware centralizado para manejo de errores.

### auth.js
Middleware de autenticación integrado con Keycloak:

- **verificarToken**: Valida el token JWT de Keycloak
  - Obtiene la clave pública de Keycloak (JWKS)
  - Verifica la firma del token (RS256)
  - Extrae información del usuario (sub, email, name, roles)
  - Busca o crea el usuario en la BD local
  - Sincroniza roles entre Keycloak y BD local
  - Adjunta `req.usuario` y `req.keycloakRoles` al request

- **esAdmin**: Verifica que el usuario tenga rol de administrador
  - Comprueba que `req.usuario.rol === 'admin'`
  - Retorna 403 si no tiene permisos

- **esPropiertarioOAdmin**: Verifica que el usuario sea propietario del recurso o admin
  - Permite acceso si es admin
  - Permite acceso si es el propietario del recurso
  - Retorna 403 si no cumple ninguna condición

### Flujo de Autenticación:
1. Frontend envía token de Keycloak en header `Authorization: Bearer <token>`
2. Middleware `verificarToken` valida el token contra Keycloak
3. Si es válido, extrae roles y datos del usuario
4. Busca usuario en BD por email, si no existe lo crea automáticamente
5. Sincroniza roles entre Keycloak y BD
6. Permite el acceso al endpoint

## 💾 Base de Datos

SQLite con Sequelize ORM. La base de datos se crea automáticamente al iniciar el servidor.

### Modelos principales:

**Usuario**
- id (PK)
- nombre
- email (único)
- password (encriptado - legacy, no se usa con Keycloak)
- rol (usuario/admin) - sincronizado con Keycloak
- activo (boolean)
- timestamps

**Publicacion** (Producto)
- id (PK)
- nombre
- descripcion
- precio
- ingredientes (text)
- variantes (JSON)
- imagen (URL)
- categoria (string)
- disponible (boolean)
- destacado (boolean)
- timestamps

**Comentario** (Review)
- id (PK)
- texto
- calificacion (1-5)
- usuarioId (FK → Usuario)
- publicacionId (FK → Publicacion)
- timestamps

**Categoria**
- id (PK)
- nombre (único)
- descripcion
- timestamps

**Ingrediente**
- id (PK)
- nombre (único)
- esAlergeno (boolean)
- descripcion
- timestamps

**PublicacionIngrediente** (Tabla intermedia)
- publicacionId (FK)
- ingredienteId (FK)
- cantidad (string)

### Relaciones:
- Usuario **tiene muchos** Comentarios
- Publicacion **tiene muchos** Comentarios
- Publicacion **pertenece a** Categoria
- Publicacion **tiene muchos** Ingredientes (many-to-many)
- Ingrediente **pertenece a muchas** Publicaciones (many-to-many)

## 🔧 Scripts Disponibles

```bash
npm start       # Ejecutar en producción
npm run dev     # Ejecutar en desarrollo con nodemon
```

## 📝 Notas de Desarrollo

### Autenticación con Keycloak:
- **Login/Registro**: Manejado completamente por Keycloak
- **Tokens JWT**: Generados y firmados por Keycloak (algoritmo RS256)
- **Validación**: Se valida contra las claves públicas de Keycloak (JWKS)
- **Usuarios**: Se crean automáticamente en BD al primer login
- **Roles**: Se sincronizan automáticamente desde Keycloak

### Seguridad:
- Todos los passwords históricos están encriptados con bcryptjs
- Los tokens de Keycloak usan firma RS256 (más seguro que HS256)
- CORS habilitado para permitir peticiones del frontend
- Tokens expiran según configuración de Keycloak (por defecto 5 minutos para access token)
- Refresh tokens permiten renovación automática sin re-login

### Base de Datos:
- SQLite sincronizada automáticamente con `{ alter: true }`
- Usuarios de Keycloak se mapean a tabla local
- Roles sincronizados: `admin` rol en Keycloak → `admin` en BD

### Dependencias de Keycloak:
- Keycloak debe estar corriendo ANTES de iniciar el backend
- Backend consulta `http://localhost:8080/realms/lv-pastas/protocol/openid-connect/certs`
- Si Keycloak no está disponible, las rutas protegidas fallarán

### Paginación:
- Implementada en `/api/publicaciones`
- Query params: `page` (default: 1), `limit` (default: 9)
- Respuesta incluye: `total`, `totalPages`, `currentPage`, `pageSize`, `publicaciones`
