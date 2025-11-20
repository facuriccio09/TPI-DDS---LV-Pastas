# Frontend - L.V Pastas Frescas

## 🚀 Inicio Rápido

```bash
# 1. Asegurate de que Keycloak y Backend estén corriendo
# Ver README principal del proyecto

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con la URL de tu backend

# 4. Ejecutar en modo desarrollo
npm run dev

# 5. Build para producción
npm run build
```

## 📦 Dependencias Instaladas

### Producción
- **react**: Biblioteca de UI
- **react-dom**: React para el navegador
- **react-router-dom**: Enrutamiento en React
- **axios**: Cliente HTTP para peticiones a la API
- **bootstrap**: Framework CSS
- **react-bootstrap**: Componentes Bootstrap para React
- **keycloak-js**: Cliente de Keycloak para React
- **moment**: Manejo y formato de fechas

### Desarrollo
- **vite**: Build tool y dev server
- **@vitejs/plugin-react**: Plugin de React para Vite
- **eslint**: Linter de código

## 🗂️ Estructura de Carpetas

```
frontend-react/
├── src/
│   ├── components/       # Componentes reutilizables
│   │   ├── Navbar.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── AdminRoute.jsx
│   ├── pages/           # Páginas principales
│   │   ├── Home.jsx
│   │   ├── Productos.jsx (Catálogo con paginación)
│   │   ├── ProductDetail.jsx (Detalle con comentarios)
│   │   ├── Login.jsx (Redirige a Keycloak)
│   │   ├── Perfil.jsx
│   │   ├── NotFound.jsx
│   │   └── Admin.jsx (Panel completo con tabs)
│   │       ├── AdminUsuarios.jsx
│   │       ├── AdminPublicaciones.jsx
│   │       ├── AdminCategorias.jsx
│   │       └── AdminIngredientes.jsx
│   ├── services/        # Servicios de API
│   │   ├── api.js (Configuración axios)
│   │   ├── authService.js (Keycloak)
│   │   ├── publicacionService.js
│   │   ├── categoriaService.js
│   │   ├── ingredienteService.js
│   │   ├── comentarioService.js
│   │   └── usuarioService.js
│   ├── context/         # Context API
│   │   └── AuthContext.jsx (Integración con Keycloak)
│   ├── App.jsx          # Componente principal con rutas
│   ├── App.css
│   ├── main.jsx         # Punto de entrada
│   └── index.css
├── public/              # Archivos estáticos
│   └── silent-check-sso.html (Para Keycloak SSO)
├── .env                 # Variables de entorno (NO commitear)
├── .env.example         # Ejemplo de variables
├── vite.config.js       # Configuración de Vite
└── package.json
```

## 🔐 Configuración de Variables de Entorno

Crear archivo `.env` en la raíz del frontend:

```env
VITE_API_URL=http://localhost:3000/api
```

⚠️ **IMPORTANTE:** Las variables de entorno en Vite deben comenzar con `VITE_`

## 🎨 Componentes Principales

### Navbar
Barra de navegación con links dinámicos según autenticación

### ProductCard
## 🧩 Componentes Principales

### Navbar
Barra de navegación con:
- Links a páginas públicas
- Botón de login/logout
- Dropdown de usuario autenticado
- Acceso al panel admin (solo para admins)

### ProductCard
Tarjeta para mostrar productos en el catálogo:
- Imagen del producto
- Nombre y precio
- Calificación promedio
- Badge de destacado/disponible
- Link a detalle

### ProtectedRoute
Componente para proteger rutas que requieren autenticación:
- Verifica si el usuario está autenticado
- Redirige a /login si no lo está
- Envuelve rutas privadas

### AdminRoute
Componente para proteger rutas de administrador:
- Verifica autenticación Y rol de admin
- Redirige si no cumple requisitos
- Envuelve rutas del panel admin

## 📄 Páginas

### Home
Página principal con:
- Hero section con imagen
- Historia del local
- Productos destacados

### Productos (Catálogo)
Catálogo de productos con:
- **Filtros**: Categoría, destacado, disponible
- **Paginación**: 9 productos por página
- **Contador**: Total de productos encontrados
- Grid responsive (3 columnas desktop, 2 tablet, 1 móvil)

### ProductDetail
Detalle completo de un producto con:
- Información completa (precio, ingredientes, categoría)
- Ingredientes con badges de alérgenos
- **Sistema de comentarios**:
  - Ver todos los comentarios con calificaciones
  - Crear comentario (usuarios autenticados)
  - Editar/Eliminar propio comentario
  - Eliminar cualquier comentario (admin)
- Manejo de productos no encontrados (404)

### Login
- **Redirige automáticamente a Keycloak**
- Pantalla de carga mientras redirige
- Si ya está autenticado, va al home

### Perfil
Página de perfil del usuario:
- Información personal
- Email y rol
- (Puede expandirse con más funcionalidades)

### Admin
Panel de administración con **4 tabs**:
1. **Usuarios**: CRUD completo de usuarios
2. **Publicaciones**: CRUD de productos con gestión de ingredientes
3. **Categorías**: CRUD de categorías
4. **Ingredientes**: CRUD de ingredientes con checkbox de alérgeno

Cada tab tiene:
- Tabla con datos
- Botones de acción (editar/eliminar)
- Modal de formulario para crear/editar
- Validaciones
- Confirmaciones de eliminación

### NotFound (404)
Página personalizada para rutas no encontradas:
- Mensaje claro
- Link para volver al home
- Diseño consistente con el sitio

## 🔌 Servicios (API)

### api.js
Configuración base de Axios con:
- Base URL desde variable de entorno
- Interceptor de request para agregar token automáticamente
- Interceptor de response para manejar errores
- Headers: `Authorization: Bearer <token>`

### authService.js
**DEPRECADO** - Ahora se maneja con Keycloak
- ~~`login(email, password)`~~
- ~~`register(userData)`~~
- `getPerfil()` - Obtener perfil del usuario autenticado

### publicacionService.js
- `getPublicaciones(params)` - Obtener productos con filtros y paginación
  - Params: `categoria`, `disponible`, `destacado`, `page`, `limit`
- `getPublicacionById(id)` - Obtener detalle de producto
- `createPublicacion(data)` - Crear producto (admin)
- `updatePublicacion(id, data)` - Actualizar producto (admin)
- `deletePublicacion(id)` - Eliminar producto (admin)
- `cambiarDisponibilidad(id, disponible)` - Toggle disponibilidad (admin)

### categoriaService.js
- `getCategorias()` - Obtener todas las categorías
- `getCategoriaById(id)` - Obtener categoría por ID
- `createCategoria(data)` - Crear categoría (admin)
- `updateCategoria(id, data)` - Actualizar categoría (admin)
- `deleteCategoria(id)` - Eliminar categoría (admin)

### ingredienteService.js
- `getIngredientes()` - Obtener todos los ingredientes
- `getIngredienteById(id)` - Obtener ingrediente por ID
- `createIngrediente(data)` - Crear ingrediente (admin)
- `updateIngrediente(id, data)` - Actualizar ingrediente (admin)
- `deleteIngrediente(id)` - Eliminar ingrediente (admin)

### comentarioService.js
- `getComentariosByPublicacion(publicacionId)` - Obtener comentarios de un producto
- `createComentario(data)` - Crear comentario (usuario autenticado)
- `updateComentario(id, data)` - Actualizar comentario (propio)
- `deleteComentario(id)` - Eliminar comentario (propio o admin)

### usuarioService.js
- `getUsuarios()` - Obtener todos los usuarios (admin)
- `getUsuarioById(id)` - Obtener usuario por ID (admin)
- `updateUsuario(id, data)` - Actualizar usuario (admin)
- `deleteUsuario(id)` - Eliminar usuario (admin)

## 🌐 Context API

### AuthContext
Context global para manejo de autenticación con **Keycloak**:

**Estado:**
- `user`: Objeto con datos del usuario autenticado
  - `id`: ID único de Keycloak (sub)
  - `nombre`: Nombre completo del usuario
  - `email`: Email del usuario
  - `rol`: Rol del usuario (`usuario` o `admin`)
- `loading`: Boolean indicando si Keycloak está inicializando
- `keycloak`: Instancia de Keycloak

**Métodos:**
- `login()`: Redirige a la página de login de Keycloak
- `logout()`: Cierra sesión y limpia tokens
- `isAdmin()`: Retorna `true` si el usuario tiene rol de admin

**Características:**
- Inicialización automática de Keycloak al cargar la app
- SSO (Single Sign-On) habilitado
- Renovación automática de tokens antes de expirar
- Carga de información del usuario desde Keycloak
- Guardado de token en localStorage para peticiones HTTP

**Uso:**
```jsx
import { useAuth } from '../context/AuthContext';

function MyComponent() {
  const { user, login, logout, isAdmin } = useAuth();
  
  if (!user) {
    return <button onClick={login}>Iniciar Sesión</button>;
  }
  
  return (
    <div>
      <p>Hola, {user.nombre}</p>
      {isAdmin() && <p>Eres administrador</p>}
      <button onClick={logout}>Cerrar Sesión</button>
    </div>
  );
}
```

## 🎨 Estilos

El proyecto usa Bootstrap y React Bootstrap para estilos:

```jsx
import 'bootstrap/dist/css/bootstrap.min.css';
```

También puedes agregar estilos personalizados en `App.css` e `index.css`

## 🔧 Scripts Disponibles

```bash
npm run dev       # Servidor de desarrollo
npm run build     # Build para producción
npm run preview   # Previsualizar build
npm run lint      # Linter (si está configurado)
```

## 📱 Rutas de la Aplicación

```jsx
// Rutas Públicas
/ - Home (página principal con hero y productos destacados)
/productos - Catálogo completo con filtros y paginación
/productos/:id - Detalle de producto con comentarios

// Rutas de Autenticación (Keycloak)
/login - Redirige a Keycloak para login

// Rutas Protegidas (requieren autenticación)
/perfil - Perfil del usuario

// Rutas de Admin (requieren autenticación + rol admin)
/admin - Panel de administración con 4 tabs:
  - Usuarios
  - Publicaciones
  - Categorías
  - Ingredientes

// Ruta Especial
* - NotFound (404) para rutas no existentes
```

## 🔐 Protección de Rutas

### ProtectedRoute
Envuelve rutas que requieren autenticación:

```jsx
<Route element={<ProtectedRoute />}>
  <Route path="/perfil" element={<Perfil />} />
</Route>
```

- Verifica si `user` existe en AuthContext
- Redirige a `/login` si no está autenticado
- Muestra spinner mientras carga

### AdminRoute
Envuelve rutas que requieren rol de administrador:

```jsx
<Route element={<AdminRoute />}>
  <Route path="/admin" element={<Admin />} />
</Route>
```

- Verifica autenticación Y rol de admin
- Redirige a `/` si no es admin
- Muestra mensaje de "Acceso denegado" si no tiene permisos

## 🎨 Estilos

### Bootstrap
El proyecto usa Bootstrap 5 y React Bootstrap:

```jsx
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
```

### Estilos Personalizados
Cada página tiene su propio archivo CSS:
- `Home.css` - Estilos del hero y sección destacados
- `Productos.css` - Estilos del catálogo, filtros y paginación
- `ProductDetail.css` - Estilos del detalle y comentarios
- `Login.css` - Estilos de la página de login
- `Navbar.css` - Estilos del navbar
- `ProductCard.css` - Estilos de las tarjetas de productos

### Colores Principales
```css
Verde primario: #27ae60
Verde oscuro: #229954
Rojo (precio): #c0392b
Gris texto: #2c3e50
```

## 🕐 Utilidades

### Formato de Fechas con Moment
```jsx
import moment from 'moment';
import 'moment/locale/es';

moment.locale('es');
moment(fecha).format('DD/MM/YYYY HH:mm');
moment(fecha).fromNow(); // "hace 2 horas"
```

## � Notas de Desarrollo

### Autenticación con Keycloak:
- **Login/Register**: Redirigen automáticamente a Keycloak
- **Tokens**: Manejados automáticamente por keycloak-js
- **Renovación**: Tokens se renuevan automáticamente antes de expirar
- **SSO**: Single Sign-On habilitado con silent check
- **Logout**: Invalida el token en Keycloak

### Arquitectura:
- **Componentes funcionales**: Todos usan hooks
- **Context API**: Para estado global de autenticación
- **React Router**: Para navegación y rutas protegidas
- **Axios interceptors**: Para agregar tokens automáticamente
- **Bootstrap**: Para diseño responsive

### Manejo de Errores:
- 401: Token inválido → Redirige a login
- 403: Sin permisos → Muestra mensaje
- 404: No encontrado → Componente NotFound
- 500: Error servidor → Alert con mensaje

### Mejores Prácticas:
- Componentes reutilizables en `/components`
- Servicios centralizados en `/services`
- Context para estado global
- Validaciones en formularios
- Confirmaciones antes de eliminar
- Loading states en peticiones HTTP
- Manejo de errores en todos los casos

## 🚀 Despliegue

```bash
# Build para producción
npm run build

# Los archivos se generan en la carpeta dist/
# Configurar variables de entorno para producción
```

### Variables de Entorno para Producción:
```env
VITE_API_URL=https://tu-api-backend.com/api
```

**IMPORTANTE:** Keycloak debe estar accesible desde la URL de producción.
