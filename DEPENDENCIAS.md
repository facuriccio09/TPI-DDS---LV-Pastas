# 📦 Resumen de Dependencias Instaladas

## Backend (Node.js + Express)

### Dependencias de Producción

```json
{
  "express": "^4.x.x",        // Framework web
  "sequelize": "^6.x.x",      // ORM para base de datos
  "sqlite3": "^5.x.x",        // Base de datos SQLite
  "jsonwebtoken": "^9.x.x",   // JWT para autenticación
  "bcryptjs": "^2.x.x",       // Encriptación de contraseñas
  "cors": "^2.x.x",           // CORS middleware
  "dotenv": "^16.x.x"         // Variables de entorno
}
```

### Dependencias de Desarrollo

```json
{
  "nodemon": "^3.x.x"         // Auto-reinicio del servidor
}
```

### Comando de instalación completo:
```bash
cd backend
npm install express sequelize sqlite3 jsonwebtoken bcryptjs cors dotenv
npm install -D nodemon
```

---

## Frontend (React + Vite)

### Dependencias de Producción

```json
{
  "react": "^18.x.x",              // Biblioteca UI
  "react-dom": "^18.x.x",          // React para navegador
  "react-router-dom": "^6.x.x",    // Enrutamiento
  "axios": "^1.x.x",               // Cliente HTTP
  "bootstrap": "^5.x.x",           // Framework CSS
  "react-bootstrap": "^2.x.x",     // Componentes Bootstrap para React
  "moment": "^2.x.x",              // Manejo de fechas
  "react-hook-form": "^7.x.x"      // Manejo de formularios
}
```

### Dependencias de Desarrollo

```json
{
  "vite": "^7.x.x",                      // Build tool
  "@vitejs/plugin-react": "^4.x.x",     // Plugin React para Vite
  "eslint": "^9.x.x"                     // Linter
}
```

### Comando de instalación completo:
```bash
cd frontend-react
npm install axios react-router-dom bootstrap react-bootstrap moment react-hook-form
```

---

## 📊 Total de Dependencias

### Backend
- **Producción**: 7 paquetes
- **Desarrollo**: 1 paquete
- **Total instalados**: ~238 paquetes (incluyendo subdependencias)

### Frontend
- **Producción**: 8 paquetes
- **Desarrollo**: 3 paquetes (incluidos con Vite)
- **Total instalados**: ~210 paquetes (incluyendo subdependencias)

---

## 🔍 Descripción Detallada de Cada Dependencia

### Backend

#### Express
Framework minimalista y flexible para Node.js que proporciona un conjunto robusto de características para aplicaciones web y móviles.

#### Sequelize
ORM (Object-Relational Mapping) para Node.js que soporta PostgreSQL, MySQL, MariaDB, SQLite y SQL Server. Maneja modelos, relaciones, validaciones y transacciones.

#### SQLite3
Base de datos relacional embebida, sin servidor, sin configuración y transaccional. Perfecta para desarrollo y aplicaciones pequeñas.

#### jsonwebtoken
Implementación de JSON Web Tokens (JWT) para Node.js. Permite crear y verificar tokens para autenticación.

#### bcryptjs
Biblioteca para hashear contraseñas de forma segura. Implementación en JavaScript puro de bcrypt.

#### CORS
Middleware de Express para habilitar CORS (Cross-Origin Resource Sharing), permitiendo que el frontend haga peticiones al backend desde diferente origen.

#### dotenv
Carga variables de entorno desde un archivo .env al process.env de Node.js.

#### nodemon
Herramienta de desarrollo que reinicia automáticamente el servidor cuando detecta cambios en los archivos.

---

### Frontend

#### React
Biblioteca de JavaScript para construir interfaces de usuario, desarrollada por Facebook.

#### React DOM
Package que proporciona métodos específicos del DOM que se usan en la capa superior de React.

#### React Router DOM
Sistema de enrutamiento estándar para React. Permite navegación entre páginas sin recargar.

#### Axios
Cliente HTTP basado en promesas para el navegador y Node.js. Más fácil de usar que fetch nativo.

#### Bootstrap
Framework CSS más popular del mundo para diseño responsive y mobile-first.

#### React Bootstrap
Componentes de Bootstrap reconstruidos como componentes React, sin dependencia de jQuery.

#### Moment
Biblioteca para parsear, validar, manipular y formatear fechas en JavaScript.

#### React Hook Form
Biblioteca performante y flexible para manejo de formularios en React con validación fácil.

#### Vite
Build tool de nueva generación que proporciona desarrollo ultra rápido con Hot Module Replacement (HMR).

---

## 🚀 Scripts Configurados

### Backend (package.json)
```json
{
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
  }
}
```

### Frontend (package.json)
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

---

## 📝 Notas Importantes

1. **No commitear node_modules**: Estos están en .gitignore
2. **No commitear .env**: Contiene información sensible
3. **Usar .env.example**: Como plantilla para otros desarrolladores
4. **Versiones**: Se usaron versiones estables más recientes
5. **Compatibilidad**: Node.js v16+ requerido

---

## 🔄 Actualizaciones Futuras

Para actualizar dependencias:

```bash
# Ver paquetes desactualizados
npm outdated

# Actualizar todos a versiones minor/patch
npm update

# Actualizar a versiones major (con cuidado)
npm install <paquete>@latest
```

---

## 🆘 Solución de Problemas Comunes

### Error en SQLite3
```bash
npm rebuild sqlite3
```

### Caché corrupta de npm
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Conflictos de versiones
```bash
npm install --legacy-peer-deps
```

### Puerto en uso
Cambiar PORT en .env del backend o usar otro puerto en Vite

---

Fecha de creación: 5 de noviembre de 2025
