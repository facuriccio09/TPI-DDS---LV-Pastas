# 🚀 Guía de Inicio Rápido - LV Pastas# 🎯 Guía Rápida de Inicio - L.V Pastas Frescas



Esta guía te ayudará a levantar el proyecto completo en tu máquina local en **menos de 15 minutos**.## ✅ Checklist de Instalación



---### Para Nuevos Colaboradores



## 📋 Requisitos Previos- [ ] **1. Clonar el repositorio**

```bash

Antes de empezar, asegurate de tener instalado:git clone <url-del-repositorio>

cd TPI

- ✅ **Node.js** v16 o superior → [Descargar](https://nodejs.org/)```

- ✅ **npm** v8 o superior (viene con Node.js)

- ✅ **Git** → [Descargar](https://git-scm.com/)- [ ] **2. Configurar Backend**

- ✅ **Docker** y **Docker Compose** (para Keycloak)```bash

cd backend

---npm install

cp .env.example .env

## 🐳 Paso 1: Instalar Docker (Solo una vez)# Editar .env si es necesario

```

### En Ubuntu/Debian:

```bash- [ ] **3. Configurar Frontend**

sudo apt update```bash

sudo apt install docker.io docker-compose -ycd ../frontend-react

sudo systemctl start dockernpm install

sudo systemctl enable dockercp .env.example .env

sudo usermod -aG docker $USER# Verificar que VITE_API_URL apunte a http://localhost:3000/api

``````



**IMPORTANTE:** Después de ejecutar `usermod`, **cierra sesión y vuelve a iniciar** para que los cambios surtan efecto.- [ ] **4. Iniciar el Backend** (Terminal 1)

```bash

Verificar instalación:cd backend

```bashnpm run dev

docker --version```

docker-compose --version✓ Debe mostrar: "🚀 Servidor corriendo en http://localhost:3000"

```

- [ ] **5. Iniciar el Frontend** (Terminal 2)

---```bash

cd frontend-react

## 📥 Paso 2: Clonar el Proyectonpm run dev

```

```bash✓ Debe mostrar: "Local: http://localhost:5173/"

git clone <url-del-repositorio>

cd TPI- [ ] **6. Verificar en el navegador**

```- Backend: http://localhost:3000

- Frontend: http://localhost:5173

---

---

## 🔐 Paso 3: Levantar Keycloak

## 📁 Estructura del Proyecto (Vista Simplificada)

```bash

# Desde la raíz del proyecto (TPI/)```

docker-compose up -dTPI/

```│

├── 📄 README.md                    # Documentación principal

Esperar unos 10-15 segundos para que Keycloak inicie completamente.├── 📄 DEPENDENCIAS.md              # Lista completa de dependencias

├── 📄 GUIA-RAPIDA.md              # Este archivo

### Verificar que Keycloak esté corriendo:├── 📄 .gitignore                   # Archivos ignorados por Git

```bash│

docker ps├── 📂 backend/                     # Servidor Node.js + Express

# Deberías ver: lv-pastas-keycloak│   ├── 📄 README.md               # Documentación del backend

```│   ├── 📄 package.json            # Dependencias del backend

│   ├── 📄 .env                    # Variables de entorno (NO commitear)

### Configurar Keycloak (SOLO LA PRIMERA VEZ):│   ├── 📄 .env.example            # Plantilla de .env

│   ├── 📄 .gitignore

1. Ir a: http://localhost:8080│   │

2. Click en **"Administration Console"**│   └── 📂 src/

3. Login:│       ├── 📄 server.js           # Punto de entrada

   - Usuario: `admin`│       ├── 📄 app.js              # Configuración de Express

   - Password: `admin`│       ├── 📄 db.js               # Configuración de Sequelize

│       │

**⚠️ IMPORTANTE:** Seguí los pasos del archivo `KEYCLOAK-SETUP.md` para configurar:│       ├── 📂 models/             # Modelos de base de datos

- Realm: `lv-pastas`│       │   ├── Usuario.js         # (A crear)

- Client: `lv-pastas-frontend`│       │   ├── Publicacion.js     # (A crear)

- Roles: `usuario`, `admin`│       │   └── Comentario.js      # (A crear)

- Usuarios de prueba│       │

│       ├── 📂 routes/             # Rutas de la API

**Resumen rápido de configuración:**│       │   ├── usuarios.routes.js       # (A crear)

```│       │   ├── publicaciones.routes.js  # (A crear)

1. Create Realm → "lv-pastas"│       │   └── comentarios.routes.js    # (A crear)

2. Create Client → "lv-pastas-frontend" (Public, Standard flow, Direct access grants)│       │

   - Valid redirect URIs: http://localhost:5173/*, http://localhost:3000/*│       └── 📂 middlewares/        # Middlewares personalizados

   - Web origins: *│           ├── errorHandler.js    # ✓ Creado

3. Create Roles → "usuario" y "admin"│           └── auth.js            # (A crear)

4. Create Users:│

   - admin/admin123 (roles: usuario, admin)└── 📂 frontend-react/              # Cliente React + Vite

   - usuario/usuario123 (rol: usuario)    ├── 📄 README.md               # Documentación del frontend

```    ├── 📄 package.json            # Dependencias del frontend

    ├── 📄 .env                    # Variables de entorno

---    ├── 📄 .env.example            # Plantilla de .env

    ├── 📄 vite.config.js          # Configuración de Vite

## 🔧 Paso 4: Configurar Backend    ├── 📄 index.html              # HTML principal

    │

```bash    ├── 📂 public/                 # Archivos estáticos

cd backend    │

npm install    └── 📂 src/

        ├── 📄 main.jsx            # Punto de entrada

# Copiar y editar variables de entorno        ├── 📄 App.jsx             # Componente principal

cp .env.example .env        ├── 📄 App.css

```        ├── 📄 index.css

        │

Verificar que `.env` tenga:        ├── 📂 components/         # Componentes reutilizables

```env        │   ├── Navbar.jsx         # (A crear)

PORT=3000        │   ├── Footer.jsx         # (A crear)

KEYCLOAK_URL=http://localhost:8080        │   ├── ProductCard.jsx    # (A crear)

KEYCLOAK_REALM=lv-pastas        │   └── PrivateRoute.jsx   # (A crear)

KEYCLOAK_CLIENT_ID=lv-pastas-frontend        │

DB_PATH=./database.sqlite        ├── 📂 pages/              # Páginas principales

NODE_ENV=development        │   ├── Home.jsx           # (A crear)

```        │   ├── Catalog.jsx        # (A crear)

        │   ├── ProductDetail.jsx  # (A crear)

**Iniciar backend:**        │   ├── Login.jsx          # (A crear)

```bash        │   └── Register.jsx       # (A crear)

npm run dev        │

```        ├── 📂 services/           # Servicios de API

        │   ├── api.js             # ✓ Creado

✅ Backend corriendo en: http://localhost:3000        │   ├── authService.js     # (A crear)

        │   └── productService.js  # (A crear)

---        │

        └── 📂 context/            # Context API

## 🎨 Paso 5: Configurar Frontend            └── AuthContext.jsx    # ✓ Creado

```

**En otra terminal:**

---

```bash

cd frontend-react## 🔑 Archivos Clave Creados

npm install

### Backend

# Copiar variables de entorno- ✅ `src/app.js` - Configuración de Express con middlewares

cp .env.example .env- ✅ `src/db.js` - Configuración de Sequelize + SQLite

```- ✅ `src/server.js` - Inicialización del servidor

- ✅ `src/middlewares/errorHandler.js` - Manejo de errores

Verificar que `.env` tenga:- ✅ `.env` - Variables de entorno configuradas

```env- ✅ `package.json` - Con scripts start y dev

VITE_API_URL=http://localhost:3000/api

```### Frontend

- ✅ `src/services/api.js` - Configuración de Axios con interceptores

**Iniciar frontend:**- ✅ `src/context/AuthContext.jsx` - Context para autenticación

```bash- ✅ `.env` - Configurado con URL del backend

npm run dev- ✅ `package.json` - Con todas las dependencias instaladas

```

---

✅ Frontend corriendo en: http://localhost:5173

## 🛠️ Comandos Esenciales

---

### Backend

## 🎯 Paso 6: Probar la Aplicación```bash

# Desarrollo (auto-reinicio con nodemon)

1. Abrir en el navegador: http://localhost:5173npm run dev

2. Click en **"Iniciar Sesión"**

3. Serás redirigido a Keycloak# Producción

4. Ingresa credenciales:npm start

   - **Usuario normal**: `usuario` / `usuario123`

   - **Admin**: `admin` / `admin123`# Ver logs

5. ¡Listo! Ya estás autenticado# Los logs se muestran directamente en la terminal

```

---

### Frontend

## 📊 Resumen de Puertos```bash

# Desarrollo

| Servicio | Puerto | URL |npm run dev

|----------|--------|-----|

| **Keycloak** | 8080 | http://localhost:8080 |# Build de producción

| **Backend** | 3000 | http://localhost:3000 |npm run build

| **Frontend** | 5173 | http://localhost:5173 |

# Preview de producción

---npm run preview

```

## 🔄 Comandos Útiles

---

### Docker (Keycloak)

```bash## 🔐 Variables de Entorno Configuradas

docker-compose up -d       # Iniciar Keycloak

docker-compose down        # Detener Keycloak### Backend (.env)

docker-compose logs -f     # Ver logs```env

docker ps                  # Ver contenedores corriendoPORT=3000

```JWT_SECRET=tu_clave_secreta_muy_segura_aqui

JWT_EXPIRES_IN=7d

### BackendDB_PATH=./database.sqlite

```bashNODE_ENV=development

npm run dev    # Modo desarrollo (con auto-reload)```

npm start      # Modo producción

```### Frontend (.env)

```env

### FrontendVITE_API_URL=http://localhost:3000/api

```bash```

npm run dev      # Modo desarrollo

npm run build    # Build para producción---

npm run preview  # Preview del build

```## 🧪 Probar la Instalación



---### 1. Verificar Backend

```bash

## ❌ Detener Todocurl http://localhost:3000

```

```bashDebería responder con:

# Detener Keycloak```json

docker-compose down{"message":"Bienvenido a la API de L.V Pastas Frescas"}

```

# Backend y Frontend: Ctrl + C en sus respectivas terminales

```### 2. Verificar Frontend

Abrir en el navegador: http://localhost:5173

---Debería cargar la aplicación React (actualmente con la plantilla de Vite)



## 🆘 Troubleshooting---



### Error: "Cannot connect to Keycloak"## 📦 Dependencias Instaladas

```bash

# Verificar que Keycloak esté corriendo### Backend (7 + 1 dev)

docker ps- express, sequelize, sqlite3, jsonwebtoken, bcryptjs, cors, dotenv

- nodemon (dev)

# Si no está corriendo, iniciarlo

docker-compose up -d### Frontend (8 + incluidos con Vite)

- react, react-dom, react-router-dom, axios

# Ver logs para errores- bootstrap, react-bootstrap, moment, react-hook-form

docker-compose logs -f keycloak

```Ver `DEPENDENCIAS.md` para más detalles.



### Error: "CORS"---

- Verificar que en Keycloak Client Settings:

  - Web Origins: `*` o `http://localhost:5173`## 🎯 Próximos Pasos de Desarrollo



### Error: "EADDRINUSE: address already in use"1. **Modelos de Base de Datos** (Backend)

- Ya hay algo corriendo en ese puerto   - [ ] Usuario.js

- Cambiar el puerto o matar el proceso:   - [ ] Publicacion.js

```bash   - [ ] Comentario.js

# Ver qué está usando el puerto 3000

sudo lsof -i :30002. **Rutas de la API** (Backend)

   - [ ] usuarios.routes.js (registro, login, perfil)

# Matar el proceso   - [ ] publicaciones.routes.js (CRUD productos)

kill -9 <PID>   - [ ] comentarios.routes.js (CRUD reviews)

```

3. **Middlewares** (Backend)

### Base de datos corrupta   - [ ] auth.js (verificar JWT, verificar admin)

```bash

cd backend4. **Componentes** (Frontend)

rm database.sqlite   - [ ] Navbar.jsx

npm run dev  # Se creará automáticamente   - [ ] Footer.jsx

```   - [ ] ProductCard.jsx

   - [ ] PrivateRoute.jsx

---

5. **Páginas** (Frontend)

## 📚 Documentación Adicional   - [ ] Home.jsx

   - [ ] Catalog.jsx

- **README.md**: Documentación completa del proyecto   - [ ] ProductDetail.jsx

- **KEYCLOAK-SETUP.md**: Configuración detallada de Keycloak   - [ ] Login.jsx

- **KEYCLOAK-INTEGRACION.md**: Cómo funciona la integración   - [ ] Register.jsx

- **backend/README.md**: Documentación del backend   - [ ] Admin Panel

- **frontend-react/README.md**: Documentación del frontend

- **backend/API-ENDPOINTS.md**: Lista completa de endpoints6. **Servicios** (Frontend)

   - [ ] authService.js

---   - [ ] productService.js

   - [ ] reviewService.js

## 🎉 ¡Listo!

---

Si seguiste todos los pasos, deberías tener:

- ✅ Keycloak corriendo y configurado## 🚨 Problemas Comunes y Soluciones

- ✅ Backend conectado a Keycloak

- ✅ Frontend funcionando con login### Backend no inicia

- ✅ Usuarios de prueba creados```bash

# Verificar que el puerto 3000 esté libre

**¡Ahora puedes empezar a desarrollar!** 🚀lsof -i :3000

# Si está ocupado, cambiar PORT en .env

---

# Reinstalar dependencias

## 📝 Usuarios de Pruebacd backend

rm -rf node_modules package-lock.json

### Usuario Normal:npm install

- **Username**: `usuario````

- **Password**: `usuario123`

- **Permisos**: Ver productos, crear comentarios### Frontend no inicia

```bash

### Administrador:# Verificar que el puerto 5173 esté libre

- **Username**: `admin`lsof -i :5173

- **Password**: `admin123`

- **Permisos**: Acceso completo al panel de administración# Reinstalar dependencias

cd frontend-react

---rm -rf node_modules package-lock.json

npm install

## 🔧 Arquitectura del Sistema```



```### Error de CORS

┌─────────────┐         ┌─────────────┐         ┌─────────────┐Verificar que CORS esté habilitado en `backend/src/app.js`:

│   Frontend  │────────▶│   Backend   │────────▶│   Database  │```javascript

│  (React)    │         │  (Node.js)  │         │   (SQLite)  │app.use(cors());

│  Port 5173  │         │  Port 3000  │         │             │```

└─────────────┘         └─────────────┘         └─────────────┘

       │                       │### Error de conexión del frontend al backend

       │                       │Verificar `.env` del frontend:

       └───────────────┬───────┘```env

                       │VITE_API_URL=http://localhost:3000/api

                       ▼```

               ┌─────────────┐

               │  Keycloak   │### Base de datos no se crea

               │  (Docker)   │El archivo `database.sqlite` se crea automáticamente en la carpeta `backend/` al iniciar el servidor por primera vez.

               │  Port 8080  │

               └─────────────┘---

```

## 📝 Convenciones del Proyecto

---

### Nombres de archivos

## 💡 Tips para Desarrollo- Componentes React: `PascalCase.jsx` (ej: `ProductCard.jsx`)

- Servicios: `camelCase.js` (ej: `authService.js`)

1. **Hot Reload**: Tanto frontend como backend se recargan automáticamente al guardar cambios- Rutas: `kebab-case.routes.js` (ej: `usuarios.routes.js`)

2. **Logs**: Mantené las terminales abiertas para ver logs en tiempo real

3. **Base de Datos**: SQLite se crea automáticamente, no necesitas configurar nada### Estructura de commits (sugerida)

4. **Tokens**: Se manejan automáticamente, no necesitas preocuparte por ellos```

5. **Roles**: Se sincronizan automáticamente desde Keycloak a la BDfeat: Agregar modelo de Usuario

fix: Corregir error en login

---docs: Actualizar README

style: Formatear código

## 🚨 Problemas Comunesrefactor: Mejorar estructura de rutas

```

### "Token inválido"

- Keycloak no está corriendo---

- Verificar con `docker ps`

## 👥 Información del Equipo

### "Usuario no encontrado"

- El usuario debe hacer login al menos una vez para crearse en la BD- **Proyecto**: L.V Pastas Frescas (La Vesubiana)

- Los usuarios se crean automáticamente en el primer login- **Materia**: Desarrollo de Software - 3K1A

- **Fecha límite presentación**: Martes próxima semana

### "Acceso denegado" en /admin- **Fecha límite muestra**: Martes o Miércoles 11-12 de noviembre

- El usuario no tiene rol de admin en Keycloak

- Ir a Keycloak → Users → (tu usuario) → Role mapping → Asignar rol "admin"---



---## 📚 Recursos Útiles



¿Problemas? Consultá la documentación completa en los READMEs o el archivo KEYCLOAK-INTEGRACION.md- [Express Documentation](https://expressjs.com/)

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
