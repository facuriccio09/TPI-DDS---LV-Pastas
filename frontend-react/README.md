# Frontend - L.V Pastas Frescas# React + Vite



## 🚀 Inicio RápidoThis template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.



```bashCurrently, two official plugins are available:

# Instalar dependencias

npm install- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh

- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Configurar variables de entorno

cp .env.example .env## React Compiler

# Editar .env con la URL de tu backend

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

# Ejecutar en modo desarrollo

npm run dev## Expanding the ESLint configuration



# Build para producciónIf you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

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
- **moment**: Manejo y formato de fechas
- **react-hook-form**: Validación y manejo de formularios

### Desarrollo
- **vite**: Build tool y dev server
- **@vitejs/plugin-react**: Plugin de React para Vite

## 🗂️ Estructura de Carpetas

```
frontend-react/
├── src/
│   ├── components/       # Componentes reutilizables
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ReviewCard.jsx
│   │   └── PrivateRoute.jsx
│   ├── pages/           # Páginas principales
│   │   ├── Home.jsx
│   │   ├── Catalog.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── Admin/
│   │       ├── Dashboard.jsx
│   │       ├── ProductForm.jsx
│   │       └── ProductList.jsx
│   ├── services/        # Servicios de API
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── productService.js
│   │   └── reviewService.js
│   ├── context/         # Context API
│   │   └── AuthContext.jsx
│   ├── App.jsx          # Componente principal
│   ├── App.css
│   ├── main.jsx         # Punto de entrada
│   └── index.css
├── public/              # Archivos estáticos
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
Tarjeta para mostrar productos en el catálogo

### ReviewCard
Tarjeta para mostrar reviews de usuarios

### PrivateRoute
Componente para proteger rutas que requieren autenticación

## 📄 Páginas

### Home
Página principal con historia y descripción del local

### Catalog
Catálogo de productos con filtros y búsqueda

### ProductDetail
Detalle completo de un producto con variantes y reviews

### Login/Register
Páginas de autenticación

### Admin Dashboard
Panel de administración para gestión de productos (solo admins)

## 🔌 Servicios (API)

### api.js
Configuración base de Axios con interceptores para:
- Agregar token JWT automáticamente
- Manejar errores 401 (token expirado)

### authService.js
- `login(email, password)`
- `register(userData)`
- `logout()`

### productService.js
- `getAllProducts()`
- `getProductById(id)`
- `createProduct(data)` (admin)
- `updateProduct(id, data)` (admin)
- `deleteProduct(id)` (admin)

### reviewService.js
- `getReviewsByProduct(productId)`
- `createReview(data)`
- `updateReview(id, data)`
- `deleteReview(id)`

## 🌐 Context API

### AuthContext
Context global para manejo de autenticación:
- `user`: Usuario actual
- `login(userData, token)`: Guardar usuario y token
- `logout()`: Cerrar sesión
- `isAdmin()`: Verificar si es admin
- `loading`: Estado de carga

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
/ - Home (pública)
/catalogo - Catálogo de productos (pública)
/producto/:id - Detalle de producto (pública)
/login - Inicio de sesión (pública)
/register - Registro (pública)
/admin - Dashboard admin (privada - solo admin)
/admin/productos - Gestión de productos (privada - solo admin)
/admin/productos/nuevo - Crear producto (privada - solo admin)
/admin/productos/editar/:id - Editar producto (privada - solo admin)
```

## 🔐 Protección de Rutas

Usar el componente `PrivateRoute` para proteger rutas:

```jsx
<Route 
  path="/admin" 
  element={
    <PrivateRoute adminOnly>
      <AdminDashboard />
    </PrivateRoute>
  } 
/>
```

## 📝 Uso de React Hook Form

```jsx
import { useForm } from 'react-hook-form';

const { register, handleSubmit, formState: { errors } } = useForm();

const onSubmit = (data) => {
  // Manejar datos del formulario
};
```

## 🕐 Formato de Fechas con Moment

```jsx
import moment from 'moment';
import 'moment/locale/es'; // Idioma español

moment.locale('es');
moment(fecha).format('DD/MM/YYYY HH:mm');
moment(fecha).fromNow(); // "hace 2 horas"
```

## 📦 Importar Bootstrap

En `main.jsx`:
```jsx
import 'bootstrap/dist/css/bootstrap.min.css';
```

## 🚀 Despliegue

```bash
# Build para producción
npm run build

# Los archivos se generan en la carpeta dist/
```

## 📝 Notas de Desarrollo

- Todos los componentes deben ser funcionales (con hooks)
- Usar `useState` y `useEffect` para estado y efectos
- Usar `useContext` para acceder al AuthContext
- Usar React Bootstrap para componentes UI
- Todas las peticiones HTTP se hacen con Axios
- Los tokens se guardan en localStorage
- Las rutas protegidas verifican autenticación antes de renderizar
