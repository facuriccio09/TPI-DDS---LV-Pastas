# L.V Pastas Frescas - La Vesubiana

## � ¿Primera vez con el proyecto?

**👉 Lee [INICIO-RAPIDO.md](./INICIO-RAPIDO.md) para empezar en 10 minutos.**

---

## �📋 Descripción del Proyecto

Aplicación web full-stack para la fábrica de pastas artesanales **"L.V Pastas Frescas"** (La Vesubiana Pastas Frescas).

### Características principales:
- 🏠 Página principal con historia y descripción del local
- 📦 Catálogo de productos con precios y detalles
- 📝 Sistema de reviews para cada producto
- 👨‍💼 Panel de administración para gestión de productos y precios
- 🔐 Sistema de autenticación con **Keycloak** (IAM - Identity Access Management)
- 🍝 Gestión de variantes de productos (ej: Ravioles de Jamón y Queso, Carne y Verdura, etc.)
- 🐳 Despliegue con Docker para servicios de autenticación

---

## 🛠️ Tecnologías Utilizadas

### Backend
- **Node.js** - Entorno de ejecución
- **Express** - Framework web
- **Sequelize** - ORM para base de datos
- **SQLite** - Base de datos
- **Keycloak** - Sistema de autenticación y autorización (IAM)
- **JWT (jsonwebtoken)** - Validación de tokens
- **jwks-rsa** - Validación de tokens de Keycloak
- **bcryptjs** - Encriptación de contraseñas (legacy)
- **cors** - Manejo de CORS
- **dotenv** - Variables de entorno
- **nodemon** - Auto-reinicio en desarrollo
- **Docker** - Contenedores para Keycloak

### Frontend
- **React** - Biblioteca de UI
- **Vite** - Build tool y dev server
- **React Router DOM** - Enrutamiento
- **Axios** - Cliente HTTP
- **Bootstrap** - Framework CSS
- **React Bootstrap** - Componentes React de Bootstrap
- **keycloak-js** - Cliente de Keycloak para React
- **Moment** - Manejo de fechas

---

## 📁 Estructura del Proyecto

```
TPI/
├── backend/
│   ├── src/
│   │   ├── models/          # Modelos de Sequelize (Usuario, Publicacion, Comentario)
│   │   ├── routes/          # Rutas de la API
│   │   ├── middlewares/     # Middlewares (errorHandler, auth, etc.)
│   │   ├── app.js           # Configuración de Express
│   │   ├── db.js            # Configuración de Sequelize
│   │   └── server.js        # Punto de entrada del servidor
│   ├── .env.example         # Ejemplo de variables de entorno
│   ├── .gitignore
│   └── package.json
│
├── frontend-react/
│   ├── src/
│   │   ├── components/      # Componentes reutilizables (Navbar, Cargando, etc.)
│   │   ├── pages/           # Páginas principales
│   │   ├── services/        # Servicios (API calls con Axios)
│   │   ├── context/         # Context API (AuthContext)
│   │   ├── App.jsx          # Componente principal
│   │   └── main.jsx         # Punto de entrada
│   ├── .env.example         # Ejemplo de variables de entorno
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🚀 Instalación y Configuración

### Requisitos Previos
- Node.js (v16 o superior)
- npm (v8 o superior)
- Git
- Docker y Docker Compose (para Keycloak)

### 1️⃣ Clonar el Repositorio

```bash
git clone <url-del-repositorio>
cd TPI
```

### 2️⃣ Instalar y Configurar Docker (para Keycloak)

#### En Ubuntu/Debian:
```bash
sudo apt update
sudo apt install docker.io docker-compose -y
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER
```

**Nota:** Después de ejecutar `usermod`, cierra sesión y vuelve a iniciar para que los cambios surtan efecto.

#### Verificar instalación:
```bash
docker --version
docker-compose --version
```

### 3️⃣ Levantar Keycloak

```bash
# Desde la raíz del proyecto
docker-compose up -d
```

Esto iniciará Keycloak en: `http://localhost:8080`

#### Verificar que Keycloak esté corriendo:
```bash
docker ps
# Deberías ver: lv-pastas-keycloak
```

#### Acceder a Keycloak Admin Console:
1. Ir a: http://localhost:8080
2. Click en "Administration Console"
3. Login con:
   - Usuario: `admin`
   - Password: `admin`

#### Configuración de Keycloak (SOLO LA PRIMERA VEZ):

**⚠️ IMPORTANTE:** Seguí los pasos detallados en el archivo `KEYCLOAK-SETUP.md`

Resumen rápido:
1. Crear Realm: `lv-pastas`
2. Crear Client: `lv-pastas-frontend`
3. Crear Roles: `usuario`, `admin`
4. Crear usuarios de prueba:
   - Admin: `admin` / `admin123` (con roles: usuario, admin)
   - Usuario: `usuario` / `usuario123` (con rol: usuario)

### 4️⃣ Configuración del Backend

#### Instalar dependencias:
```bash
cd backend
npm install
```

**Dependencias instaladas:**
- express
- sequelize
- sqlite3
- keycloak-connect
- jsonwebtoken
- jwks-rsa
- bcryptjs
- cors
- dotenv
- nodemon (dev)

#### Configurar variables de entorno:
```bash
# Copiar el archivo de ejemplo
cp .env.example .env
```

Editar el archivo `.env` y configurar:
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

⚠️ **IMPORTANTE:** Asegurate de que las variables de Keycloak coincidan con tu configuración.

#### Ejecutar el backend:
```bash
# Modo desarrollo (con nodemon)
npm run dev

# Modo producción
npm start
```

El servidor estará corriendo en: `http://localhost:3000`

---

### 5️⃣ Configuración del Frontend

#### Instalar dependencias:
```bash
cd frontend-react
npm install
```

**Dependencias instaladas:**
- react
- react-dom
- react-router-dom
- axios
- bootstrap
- react-bootstrap
- keycloak-js
- moment
- vite (dev)

#### Configurar variables de entorno:
```bash
# Copiar el archivo de ejemplo
cp .env.example .env
```

Editar el archivo `.env`:
```env
VITE_API_URL=http://localhost:3000/api
```

#### Ejecutar el frontend:
```bash
# Modo desarrollo
npm run dev
```

El frontend estará corriendo en: `http://localhost:5173`

---

## 🎯 Orden de Inicio de Servicios

Para que la aplicación funcione correctamente, debes iniciar los servicios en este orden:

1. **Keycloak** (Docker):
   ```bash
   docker-compose up -d
   ```

2. **Backend** (Node.js):
   ```bash
   cd backend
   npm run dev
   ```

3. **Frontend** (React):
   ```bash
   cd frontend-react
   npm run dev
   ```

### Verificar que todo esté corriendo:
- Keycloak: http://localhost:8080
- Backend API: http://localhost:3000/api
- Frontend: http://localhost:5173

---

## 📝 Scripts Disponibles

### Docker (Keycloak)
```bash
docker-compose up -d        # Inicia Keycloak en segundo plano
docker-compose down         # Detiene Keycloak
docker-compose logs -f      # Ver logs de Keycloak
docker ps                   # Ver contenedores corriendo
```

### Backend
```bash
npm start       # Inicia el servidor en modo producción
npm run dev     # Inicia el servidor en modo desarrollo con nodemon
```

### Frontend
```bash
npm run dev     # Inicia el servidor de desarrollo
npm run build   # Construye la aplicación para producción
npm run preview # Previsualiza la build de producción
```

---

## 🔐 Sistema de Autenticación con Keycloak

El proyecto implementa autenticación con **Keycloak**, un sistema IAM (Identity and Access Management) profesional:

### ¿Qué es Keycloak?
Keycloak es una solución de autenticación y autorización open-source que proporciona:
- 🔒 Single Sign-On (SSO)
- 🔑 Gestión centralizada de usuarios
- 🎫 Tokens JWT automáticos (RS256)
- 👥 Gestión de roles y permisos
- 🔄 Refresh tokens automáticos
- 🌐 OAuth 2.0 y OpenID Connect

### Roles de usuario:
- **usuario**: Puede ver productos y crear comentarios/reviews
- **admin**: Acceso completo al panel de administración

### Flujo de Autenticación:
1. Usuario hace click en "Iniciar Sesión"
2. Es redirigido a Keycloak (http://localhost:8080)
3. Ingresa credenciales en Keycloak
4. Keycloak valida y genera token JWT
5. Usuario es redirigido a la app con el token
6. Token se usa para todas las peticiones al backend

### Usuarios de Prueba:
```
Usuario normal:
- Username: usuario
- Password: usuario123
- Rol: usuario

Administrador:
- Username: admin
- Password: admin123
- Roles: usuario, admin
```

### Gestionar Usuarios en Keycloak:
1. Ir a: http://localhost:8080
2. Login con `admin` / `admin`
3. Seleccionar realm `lv-pastas`
4. Menú: Users → Add user
5. Asignar roles desde Role mapping

### Flujo de autenticación:
1. Usuario se registra o inicia sesión
2. Backend genera un JWT token
3. Frontend almacena el token en localStorage
4. Token se envía en cada petición mediante el header `Authorization: Bearer <token>`
5. Backend valida el token en rutas protegidas

---

## 🗃️ Base de Datos

El proyecto utiliza **SQLite** con **Sequelize** como ORM.

### Modelos principales:
- **Usuario**: Gestión de usuarios y administradores
- **Publicacion** (Producto): Catálogo de productos con precios e ingredientes
- **Comentario** (Review): Reviews de usuarios sobre productos

La base de datos se crea automáticamente al iniciar el backend por primera vez.

---

## 🎨 Frontend - Componentes Principales

### Estructura de carpetas:
- **components/**: Componentes reutilizables (Navbar, Footer, ProductCard, etc.)
- **pages/**: Páginas completas (Home, Catalog, ProductDetail, Admin, etc.)
- **services/**: Configuración de Axios y llamadas a la API
- **context/**: Context API para estado global (AuthContext)

### Librerías clave:
- **React Router DOM**: Navegación entre páginas
- **React Bootstrap**: Componentes UI pre-diseñados
- **React Hook Form**: Validación y manejo de formularios
- **Axios**: Peticiones HTTP al backend
- **Moment**: Formateo de fechas en reviews

---

## 👥 Trabajo en Equipo

### Para nuevos colaboradores:

1. **Clonar el repositorio**
2. **Instalar dependencias del backend**:
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Configurar el archivo .env
   npm run dev
   ```

3. **Instalar dependencias del frontend** (en otra terminal):
   ```bash
   cd frontend-react
   npm install
   cp .env.example .env
   # Configurar el archivo .env
   npm run dev
   ```

4. **Verificar que todo funcione**:
   - Backend: http://localhost:3000
   - Frontend: http://localhost:5173

---

## 📦 Entidades y Relaciones

### Producto (Publicacion)
- Nombre (ej: "Ravioles")
- Descripción
- Precio
- Ingredientes
- Variantes (ej: "Jamón y Queso", "Carne y Verdura", "4 Quesos")
- Imagen

### Usuario
- Nombre
- Email
- Contraseña (encriptada)
- Rol (usuario/admin)

### Review (Comentario)
- Texto del comentario
- Calificación (1-5 estrellas)
- Usuario que comentó
- Producto comentado
- Fecha

---

## 🔧 Próximos Pasos de Desarrollo

1. ✅ Estructura de carpetas y dependencias (COMPLETADO)
2. ⏳ Crear modelos de Sequelize (Usuario, Publicacion, Comentario)
3. ⏳ Implementar rutas del backend (CRUD completo)
4. ⏳ Crear middlewares de autenticación y validación
5. ⏳ Implementar operación transaccional
6. ⏳ Desarrollar componentes del frontend
7. ⏳ Integrar frontend con backend
8. ⏳ Implementar sistema de reviews
9. ⏳ Panel de administración
10. ⏳ Testing y documentación final

---

## 📅 Fechas Importantes

- **Presentación y conversación**: Martes (próxima semana)
- **Muestra del proyecto**: Martes o Miércoles 11-12 de noviembre
- **Evaluación**: Funcionalidad, funcionamiento y documentación

---

## 👨‍💻 Equipo de Desarrollo

- [Agregar nombres de los integrantes aquí]

---

## 📄 Licencia

ISC

---

## 🆘 Soporte y Dudas

Para cualquier duda o problema:
1. Verificar que todas las dependencias estén instaladas
2. Verificar que los archivos `.env` estén configurados correctamente
3. Verificar que ambos servidores (backend y frontend) estén corriendo
4. Revisar la consola para mensajes de error

**Comandos útiles para debugging:**
```bash
# Ver logs del backend
cd backend
npm run dev

# Ver logs del frontend
cd frontend-react
npm run dev

# Verificar versión de Node.js
node --version

# Limpiar node_modules y reinstalar (si hay problemas)
rm -rf node_modules package-lock.json
npm install
```

