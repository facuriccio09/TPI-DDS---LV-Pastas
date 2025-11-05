# 🎯 Guía Rápida de Inicio - L.V Pastas Frescas

## ✅ Checklist de Instalación

### Para Nuevos Colaboradores

- [ ] **1. Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd TPI
```

- [ ] **2. Configurar Backend**
```bash
cd backend
npm install
cp .env.example .env
# Editar .env si es necesario
```

- [ ] **3. Configurar Frontend**
```bash
cd ../frontend-react
npm install
cp .env.example .env
# Verificar que VITE_API_URL apunte a http://localhost:3000/api
```

- [ ] **4. Iniciar el Backend** (Terminal 1)
```bash
cd backend
npm run dev
```
✓ Debe mostrar: "🚀 Servidor corriendo en http://localhost:3000"

- [ ] **5. Iniciar el Frontend** (Terminal 2)
```bash
cd frontend-react
npm run dev
```
✓ Debe mostrar: "Local: http://localhost:5173/"

- [ ] **6. Verificar en el navegador**
- Backend: http://localhost:3000
- Frontend: http://localhost:5173

---

## 📁 Estructura del Proyecto (Vista Simplificada)

```
TPI/
│
├── 📄 README.md                    # Documentación principal
├── 📄 DEPENDENCIAS.md              # Lista completa de dependencias
├── 📄 GUIA-RAPIDA.md              # Este archivo
├── 📄 .gitignore                   # Archivos ignorados por Git
│
├── 📂 backend/                     # Servidor Node.js + Express
│   ├── 📄 README.md               # Documentación del backend
│   ├── 📄 package.json            # Dependencias del backend
│   ├── 📄 .env                    # Variables de entorno (NO commitear)
│   ├── 📄 .env.example            # Plantilla de .env
│   ├── 📄 .gitignore
│   │
│   └── 📂 src/
│       ├── 📄 server.js           # Punto de entrada
│       ├── 📄 app.js              # Configuración de Express
│       ├── 📄 db.js               # Configuración de Sequelize
│       │
│       ├── 📂 models/             # Modelos de base de datos
│       │   ├── Usuario.js         # (A crear)
│       │   ├── Publicacion.js     # (A crear)
│       │   └── Comentario.js      # (A crear)
│       │
│       ├── 📂 routes/             # Rutas de la API
│       │   ├── usuarios.routes.js       # (A crear)
│       │   ├── publicaciones.routes.js  # (A crear)
│       │   └── comentarios.routes.js    # (A crear)
│       │
│       └── 📂 middlewares/        # Middlewares personalizados
│           ├── errorHandler.js    # ✓ Creado
│           └── auth.js            # (A crear)
│
└── 📂 frontend-react/              # Cliente React + Vite
    ├── 📄 README.md               # Documentación del frontend
    ├── 📄 package.json            # Dependencias del frontend
    ├── 📄 .env                    # Variables de entorno
    ├── 📄 .env.example            # Plantilla de .env
    ├── 📄 vite.config.js          # Configuración de Vite
    ├── 📄 index.html              # HTML principal
    │
    ├── 📂 public/                 # Archivos estáticos
    │
    └── 📂 src/
        ├── 📄 main.jsx            # Punto de entrada
        ├── 📄 App.jsx             # Componente principal
        ├── 📄 App.css
        ├── 📄 index.css
        │
        ├── 📂 components/         # Componentes reutilizables
        │   ├── Navbar.jsx         # (A crear)
        │   ├── Footer.jsx         # (A crear)
        │   ├── ProductCard.jsx    # (A crear)
        │   └── PrivateRoute.jsx   # (A crear)
        │
        ├── 📂 pages/              # Páginas principales
        │   ├── Home.jsx           # (A crear)
        │   ├── Catalog.jsx        # (A crear)
        │   ├── ProductDetail.jsx  # (A crear)
        │   ├── Login.jsx          # (A crear)
        │   └── Register.jsx       # (A crear)
        │
        ├── 📂 services/           # Servicios de API
        │   ├── api.js             # ✓ Creado
        │   ├── authService.js     # (A crear)
        │   └── productService.js  # (A crear)
        │
        └── 📂 context/            # Context API
            └── AuthContext.jsx    # ✓ Creado
```

---

## 🔑 Archivos Clave Creados

### Backend
- ✅ `src/app.js` - Configuración de Express con middlewares
- ✅ `src/db.js` - Configuración de Sequelize + SQLite
- ✅ `src/server.js` - Inicialización del servidor
- ✅ `src/middlewares/errorHandler.js` - Manejo de errores
- ✅ `.env` - Variables de entorno configuradas
- ✅ `package.json` - Con scripts start y dev

### Frontend
- ✅ `src/services/api.js` - Configuración de Axios con interceptores
- ✅ `src/context/AuthContext.jsx` - Context para autenticación
- ✅ `.env` - Configurado con URL del backend
- ✅ `package.json` - Con todas las dependencias instaladas

---

## 🛠️ Comandos Esenciales

### Backend
```bash
# Desarrollo (auto-reinicio con nodemon)
npm run dev

# Producción
npm start

# Ver logs
# Los logs se muestran directamente en la terminal
```

### Frontend
```bash
# Desarrollo
npm run dev

# Build de producción
npm run build

# Preview de producción
npm run preview
```

---

## 🔐 Variables de Entorno Configuradas

### Backend (.env)
```env
PORT=3000
JWT_SECRET=tu_clave_secreta_muy_segura_aqui
JWT_EXPIRES_IN=7d
DB_PATH=./database.sqlite
NODE_ENV=development
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3000/api
```

---

## 🧪 Probar la Instalación

### 1. Verificar Backend
```bash
curl http://localhost:3000
```
Debería responder con:
```json
{"message":"Bienvenido a la API de L.V Pastas Frescas"}
```

### 2. Verificar Frontend
Abrir en el navegador: http://localhost:5173
Debería cargar la aplicación React (actualmente con la plantilla de Vite)

---

## 📦 Dependencias Instaladas

### Backend (7 + 1 dev)
- express, sequelize, sqlite3, jsonwebtoken, bcryptjs, cors, dotenv
- nodemon (dev)

### Frontend (8 + incluidos con Vite)
- react, react-dom, react-router-dom, axios
- bootstrap, react-bootstrap, moment, react-hook-form

Ver `DEPENDENCIAS.md` para más detalles.

---

## 🎯 Próximos Pasos de Desarrollo

1. **Modelos de Base de Datos** (Backend)
   - [ ] Usuario.js
   - [ ] Publicacion.js
   - [ ] Comentario.js

2. **Rutas de la API** (Backend)
   - [ ] usuarios.routes.js (registro, login, perfil)
   - [ ] publicaciones.routes.js (CRUD productos)
   - [ ] comentarios.routes.js (CRUD reviews)

3. **Middlewares** (Backend)
   - [ ] auth.js (verificar JWT, verificar admin)

4. **Componentes** (Frontend)
   - [ ] Navbar.jsx
   - [ ] Footer.jsx
   - [ ] ProductCard.jsx
   - [ ] PrivateRoute.jsx

5. **Páginas** (Frontend)
   - [ ] Home.jsx
   - [ ] Catalog.jsx
   - [ ] ProductDetail.jsx
   - [ ] Login.jsx
   - [ ] Register.jsx
   - [ ] Admin Panel

6. **Servicios** (Frontend)
   - [ ] authService.js
   - [ ] productService.js
   - [ ] reviewService.js

---

## 🚨 Problemas Comunes y Soluciones

### Backend no inicia
```bash
# Verificar que el puerto 3000 esté libre
lsof -i :3000
# Si está ocupado, cambiar PORT en .env

# Reinstalar dependencias
cd backend
rm -rf node_modules package-lock.json
npm install
```

### Frontend no inicia
```bash
# Verificar que el puerto 5173 esté libre
lsof -i :5173

# Reinstalar dependencias
cd frontend-react
rm -rf node_modules package-lock.json
npm install
```

### Error de CORS
Verificar que CORS esté habilitado en `backend/src/app.js`:
```javascript
app.use(cors());
```

### Error de conexión del frontend al backend
Verificar `.env` del frontend:
```env
VITE_API_URL=http://localhost:3000/api
```

### Base de datos no se crea
El archivo `database.sqlite` se crea automáticamente en la carpeta `backend/` al iniciar el servidor por primera vez.

---

## 📝 Convenciones del Proyecto

### Nombres de archivos
- Componentes React: `PascalCase.jsx` (ej: `ProductCard.jsx`)
- Servicios: `camelCase.js` (ej: `authService.js`)
- Rutas: `kebab-case.routes.js` (ej: `usuarios.routes.js`)

### Estructura de commits (sugerida)
```
feat: Agregar modelo de Usuario
fix: Corregir error en login
docs: Actualizar README
style: Formatear código
refactor: Mejorar estructura de rutas
```

---

## 👥 Información del Equipo

- **Proyecto**: L.V Pastas Frescas (La Vesubiana)
- **Materia**: Desarrollo de Software - 3K1A
- **Fecha límite presentación**: Martes próxima semana
- **Fecha límite muestra**: Martes o Miércoles 11-12 de noviembre

---

## 📚 Recursos Útiles

- [Express Documentation](https://expressjs.com/)
- [Sequelize Documentation](https://sequelize.org/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [React Bootstrap](https://react-bootstrap.github.io/)
- [Axios Documentation](https://axios-http.com/)

---

## ✅ Estado Actual del Proyecto

### ✓ Completado
- [x] Estructura de carpetas (backend y frontend)
- [x] Instalación de todas las dependencias
- [x] Configuración de Express
- [x] Configuración de Sequelize + SQLite
- [x] Configuración de CORS y middlewares básicos
- [x] Middleware de manejo de errores
- [x] Configuración de Axios con interceptores
- [x] Context de autenticación (AuthContext)
- [x] Archivos .env configurados
- [x] Archivos .gitignore
- [x] Documentación completa (README.md)
- [x] Backend funcionando correctamente

### ⏳ Pendiente
- [ ] Modelos de Sequelize
- [ ] Rutas de la API
- [ ] Middleware de autenticación JWT
- [ ] Componentes del frontend
- [ ] Páginas del frontend
- [ ] Servicios de API en frontend
- [ ] Integración frontend-backend
- [ ] Sistema de reviews
- [ ] Panel de administración
- [ ] Operación transaccional
- [ ] Testing

---

¡Todo listo para comenzar el desarrollo! 🚀🍝
