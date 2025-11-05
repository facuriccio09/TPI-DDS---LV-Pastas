# L.V Pastas Frescas - La Vesubiana

## 📋 Descripción del Proyecto

Aplicación web full-stack para la fábrica de pastas artesanales **"L.V Pastas Frescas"** (La Vesubiana Pastas Frescas).

### Características principales:
- 🏠 Página principal con historia y descripción del local
- 📦 Catálogo de productos con precios y detalles
- 📝 Sistema de reviews para cada producto
- 👨‍💼 Panel de administración para gestión de productos y precios
- 🔐 Sistema de autenticación con JWT (Usuario/Administrador)
- 🍝 Gestión de variantes de productos (ej: Ravioles de Jamón y Queso, Carne y Verdura, etc.)

---

## 🛠️ Tecnologías Utilizadas

### Backend
- **Node.js** - Entorno de ejecución
- **Express** - Framework web
- **Sequelize** - ORM para base de datos
- **SQLite** - Base de datos
- **JWT (jsonwebtoken)** - Autenticación
- **bcryptjs** - Encriptación de contraseñas
- **cors** - Manejo de CORS
- **dotenv** - Variables de entorno
- **nodemon** - Auto-reinicio en desarrollo

### Frontend
- **React** - Biblioteca de UI
- **Vite** - Build tool y dev server
- **React Router DOM** - Enrutamiento
- **Axios** - Cliente HTTP
- **Bootstrap** - Framework CSS
- **React Bootstrap** - Componentes React de Bootstrap
- **React Hook Form** - Manejo de formularios
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

### 1️⃣ Clonar el Repositorio

```bash
git clone <url-del-repositorio>
cd TPI
```

### 2️⃣ Configuración del Backend

#### Instalar dependencias:
```bash
cd backend
npm install
```

**Dependencias instaladas:**
- express
- sequelize
- sqlite3
- jsonwebtoken
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
JWT_SECRET=tu_clave_secreta_muy_segura_aqui
JWT_EXPIRES_IN=7d
DB_PATH=./database.sqlite
NODE_ENV=development
```

⚠️ **IMPORTANTE:** Cambiar `JWT_SECRET` por una clave segura en producción.

#### Ejecutar el backend:
```bash
# Modo desarrollo (con nodemon)
npm run dev

# Modo producción
npm start
```

El servidor estará corriendo en: `http://localhost:3000`

---

### 3️⃣ Configuración del Frontend

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
- moment
- react-hook-form
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

## 📝 Scripts Disponibles

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

## 🔐 Sistema de Autenticación

El proyecto implementa autenticación con JWT (JSON Web Tokens):

### Roles de usuario:
- **Usuario regular**: Puede ver productos y crear reviews
- **Administrador**: Puede crear/editar/eliminar productos y gestionar precios

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

