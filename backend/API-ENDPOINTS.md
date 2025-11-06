# 📡 Documentación de Endpoints - API L.V Pastas Frescas

**Base URL**: `http://localhost:3000/api`

---

## 🔐 Autenticación

La API utiliza **JWT (JSON Web Tokens)** para autenticación.

### Cómo autenticarse:
1. Registrarse o iniciar sesión
2. Obtener el token JWT
3. Incluir el token en el header `Authorization` de las peticiones:
   ```
   Authorization: Bearer <tu-token-jwt>
   ```

---

## 👥 Endpoints de Usuarios

### 1. Registrar Usuario
**POST** `/api/usuarios/register`

**Body**:
```json
{
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "password": "123456",
  "rol": "usuario"  // opcional, por defecto "usuario"
}
```

**Respuesta (201)**:
```json
{
  "message": "Usuario registrado exitosamente",
  "usuario": {
    "id": 1,
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "rol": "usuario",
    "activo": true,
    "createdAt": "2025-11-05T..."
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}
```

---

### 2. Iniciar Sesión
**POST** `/api/usuarios/login`

**Body**:
```json
{
  "email": "juan@example.com",
  "password": "123456"
}
```

**Respuesta (200)**:
```json
{
  "message": "Inicio de sesión exitoso",
  "usuario": {
    "id": 1,
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "rol": "usuario"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}
```

---

### 3. Obtener Perfil
**GET** `/api/usuarios/perfil`

**Headers**: `Authorization: Bearer <token>`

**Respuesta (200)**:
```json
{
  "usuario": {
    "id": 1,
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "rol": "usuario",
    "activo": true
  }
}
```

---

### 4. Listar Todos los Usuarios (Solo Admin)
**GET** `/api/usuarios`

**Headers**: `Authorization: Bearer <token-admin>`

**Respuesta (200)**:
```json
{
  "total": 2,
  "usuarios": [
    {
      "id": 1,
      "nombre": "Juan Pérez",
      "email": "juan@example.com",
      "rol": "usuario"
    },
    {
      "id": 2,
      "nombre": "Admin",
      "email": "admin@example.com",
      "rol": "admin"
    }
  ]
}
```

---

### 5. Obtener Usuario por ID (Solo Admin)
**GET** `/api/usuarios/:id`

**Headers**: `Authorization: Bearer <token-admin>`

**Respuesta (200)**:
```json
{
  "usuario": {
    "id": 1,
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "rol": "usuario"
  }
}
```

---

### 6. Actualizar Usuario
**PUT** `/api/usuarios/:id`

**Headers**: `Authorization: Bearer <token>`

**Body** (todos opcionales):
```json
{
  "nombre": "Juan Carlos Pérez",
  "email": "juancarlos@example.com",
  "password": "nuevaPassword123"
}
```

**Nota**: Solo el mismo usuario o un admin pueden actualizar.

**Respuesta (200)**:
```json
{
  "message": "Usuario actualizado exitosamente",
  "usuario": {
    "id": 1,
    "nombre": "Juan Carlos Pérez",
    "email": "juancarlos@example.com"
  }
}
```

---

### 7. Desactivar Usuario (Solo Admin)
**DELETE** `/api/usuarios/:id`

**Headers**: `Authorization: Bearer <token-admin>`

**Respuesta (200)**:
```json
{
  "message": "Usuario desactivado exitosamente"
}
```

---

## 🍝 Endpoints de Publicaciones (Productos)

### 1. Listar Todas las Publicaciones (Público)
**GET** `/api/publicaciones`

**Query Params** (opcionales):
- `categoria`: Filtrar por categoría
- `disponible`: true/false
- `destacado`: true/false

**Ejemplo**: `/api/publicaciones?categoria=Pastas&disponible=true`

**Respuesta (200)**:
```json
{
  "total": 3,
  "publicaciones": [
    {
      "id": 1,
      "nombre": "Ravioles",
      "descripcion": "Deliciosos ravioles artesanales...",
      "precio": "1200.00",
      "ingredientes": "Harina, Huevos, Sal, Relleno",
      "variantes": ["Jamón y Queso", "Carne y Verdura", "4 Quesos"],
      "imagen": "https://example.com/ravioles.jpg",
      "categoria": "Pastas",
      "disponible": true,
      "destacado": true,
      "calificacionPromedio": "4.5",
      "totalComentarios": 10
    }
  ]
}
```

---

### 2. Obtener Publicación por ID (Público)
**GET** `/api/publicaciones/:id`

**Respuesta (200)**:
```json
{
  "publicacion": {
    "id": 1,
    "nombre": "Ravioles",
    "descripcion": "Deliciosos ravioles artesanales...",
    "precio": "1200.00",
    "ingredientes": "Harina, Huevos, Sal, Relleno",
    "variantes": ["Jamón y Queso", "Carne y Verdura", "4 Quesos"],
    "imagen": "https://example.com/ravioles.jpg",
    "disponible": true,
    "calificacionPromedio": "4.5",
    "totalComentarios": 10,
    "comentarios": [
      {
        "id": 1,
        "texto": "Excelentes ravioles!",
        "calificacion": 5,
        "usuario": {
          "id": 1,
          "nombre": "Juan Pérez"
        },
        "createdAt": "2025-11-05T..."
      }
    ]
  }
}
```

---

### 3. Crear Publicación (Solo Admin)
**POST** `/api/publicaciones`

**Headers**: `Authorization: Bearer <token-admin>`

**Body**:
```json
{
  "nombre": "Ravioles",
  "descripcion": "Deliciosos ravioles artesanales rellenos de diferentes ingredientes",
  "precio": 1200.00,
  "ingredientes": "Harina, Huevos, Sal, Relleno",
  "variantes": ["Jamón y Queso", "Carne y Verdura", "4 Quesos", "Verdura y Queso"],
  "imagen": "https://example.com/ravioles.jpg",
  "categoria": "Pastas",
  "disponible": true,
  "destacado": true
}
```

**Respuesta (201)**:
```json
{
  "message": "Publicación creada exitosamente",
  "publicacion": {
    "id": 1,
    "nombre": "Ravioles",
    "descripcion": "Deliciosos ravioles...",
    "precio": "1200.00",
    ...
  }
}
```

---

### 4. Actualizar Publicación (Solo Admin)
**PUT** `/api/publicaciones/:id`

**Headers**: `Authorization: Bearer <token-admin>`

**Body** (todos opcionales):
```json
{
  "nombre": "Ravioles Premium",
  "precio": 1500.00,
  "disponible": true
}
```

**Respuesta (200)**:
```json
{
  "message": "Publicación actualizada exitosamente",
  "publicacion": {
    "id": 1,
    "nombre": "Ravioles Premium",
    "precio": "1500.00",
    ...
  }
}
```

---

### 5. Eliminar Publicación (Solo Admin)
**DELETE** `/api/publicaciones/:id`

**Headers**: `Authorization: Bearer <token-admin>`

**Respuesta (200)**:
```json
{
  "message": "Publicación eliminada exitosamente"
}
```

---

### 6. Cambiar Disponibilidad (Solo Admin)
**PATCH** `/api/publicaciones/:id/disponibilidad`

**Headers**: `Authorization: Bearer <token-admin>`

**Body**:
```json
{
  "disponible": false
}
```

**Respuesta (200)**:
```json
{
  "message": "Publicación deshabilitada exitosamente",
  "publicacion": {
    "id": 1,
    "nombre": "Ravioles",
    "disponible": false,
    ...
  }
}
```

---

## 💬 Endpoints de Comentarios (Reviews)

### 1. Listar Todos los Comentarios (Público)
**GET** `/api/comentarios`

**Respuesta (200)**:
```json
{
  "total": 15,
  "comentarios": [
    {
      "id": 1,
      "texto": "Excelentes ravioles!",
      "calificacion": 5,
      "usuario": {
        "id": 1,
        "nombre": "Juan Pérez",
        "email": "juan@example.com"
      },
      "publicacion": {
        "id": 1,
        "nombre": "Ravioles"
      },
      "createdAt": "2025-11-05T..."
    }
  ]
}
```

---

### 2. Obtener Comentarios de una Publicación (Público)
**GET** `/api/comentarios/publicacion/:publicacionId`

**Respuesta (200)**:
```json
{
  "total": 10,
  "calificacionPromedio": "4.5",
  "comentarios": [
    {
      "id": 1,
      "texto": "Muy ricos!",
      "calificacion": 5,
      "usuario": {
        "id": 1,
        "nombre": "Juan Pérez"
      },
      "createdAt": "2025-11-05T..."
    }
  ]
}
```

---

### 3. Obtener Comentarios de un Usuario
**GET** `/api/comentarios/usuario/:usuarioId`

**Respuesta (200)**:
```json
{
  "total": 3,
  "comentarios": [
    {
      "id": 1,
      "texto": "Excelentes!",
      "calificacion": 5,
      "publicacion": {
        "id": 1,
        "nombre": "Ravioles",
        "imagen": "https://..."
      },
      "createdAt": "2025-11-05T..."
    }
  ]
}
```

---

### 4. Obtener Comentario por ID
**GET** `/api/comentarios/:id`

**Respuesta (200)**:
```json
{
  "comentario": {
    "id": 1,
    "texto": "Excelentes ravioles!",
    "calificacion": 5,
    "usuario": {
      "id": 1,
      "nombre": "Juan Pérez"
    },
    "publicacion": {
      "id": 1,
      "nombre": "Ravioles"
    }
  }
}
```

---

### 5. Crear Comentario (Requiere Autenticación)
**POST** `/api/comentarios`

**Headers**: `Authorization: Bearer <token>`

**Body**:
```json
{
  "texto": "Excelentes ravioles! Los mejores que he probado.",
  "calificacion": 5,
  "publicacionId": 1
}
```

**Nota**: Un usuario solo puede comentar una vez por publicación.

**Respuesta (201)**:
```json
{
  "message": "Comentario creado exitosamente",
  "comentario": {
    "id": 1,
    "texto": "Excelentes ravioles!...",
    "calificacion": 5,
    "usuario": {
      "id": 1,
      "nombre": "Juan Pérez"
    },
    "publicacion": {
      "id": 1,
      "nombre": "Ravioles"
    }
  }
}
```

---

### 6. Actualizar Comentario (Solo el Autor o Admin)
**PUT** `/api/comentarios/:id`

**Headers**: `Authorization: Bearer <token>`

**Body** (al menos uno requerido):
```json
{
  "texto": "Actualicé mi opinión: son buenísimos!",
  "calificacion": 5
}
```

**Respuesta (200)**:
```json
{
  "message": "Comentario actualizado exitosamente",
  "comentario": {
    "id": 1,
    "texto": "Actualicé mi opinión...",
    "calificacion": 5,
    ...
  }
}
```

---

### 7. Eliminar Comentario (Solo el Autor o Admin)
**DELETE** `/api/comentarios/:id`

**Headers**: `Authorization: Bearer <token>`

**Respuesta (200)**:
```json
{
  "message": "Comentario eliminado exitosamente"
}
```

---

## 📊 Resumen de Endpoints

### Públicos (Sin autenticación)
- `GET /api/publicaciones` - Listar productos
- `GET /api/publicaciones/:id` - Ver producto
- `GET /api/comentarios` - Listar comentarios
- `GET /api/comentarios/publicacion/:id` - Comentarios de un producto
- `POST /api/usuarios/register` - Registro
- `POST /api/usuarios/login` - Login

### Requieren Autenticación
- `GET /api/usuarios/perfil` - Mi perfil
- `PUT /api/usuarios/:id` - Actualizar usuario
- `POST /api/comentarios` - Crear comentario
- `PUT /api/comentarios/:id` - Editar mi comentario
- `DELETE /api/comentarios/:id` - Eliminar mi comentario

### Solo Administrador
- `GET /api/usuarios` - Listar usuarios
- `GET /api/usuarios/:id` - Ver usuario
- `DELETE /api/usuarios/:id` - Desactivar usuario
- `POST /api/publicaciones` - Crear producto
- `PUT /api/publicaciones/:id` - Actualizar producto
- `DELETE /api/publicaciones/:id` - Eliminar producto
- `PATCH /api/publicaciones/:id/disponibilidad` - Cambiar disponibilidad

---

## 🔧 Ejemplos de Uso con cURL

### Registrar Usuario
```bash
curl -X POST http://localhost:3000/api/usuarios/register \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "password": "123456"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/usuarios/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@example.com",
    "password": "123456"
  }'
```

### Crear Publicación (Admin)
```bash
curl -X POST http://localhost:3000/api/publicaciones \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <tu-token>" \
  -d '{
    "nombre": "Ravioles",
    "descripcion": "Deliciosos ravioles artesanales",
    "precio": 1200.00,
    "ingredientes": "Harina, Huevos, Sal, Relleno",
    "variantes": ["Jamón y Queso", "Carne y Verdura"]
  }'
```

### Crear Comentario
```bash
curl -X POST http://localhost:3000/api/comentarios \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <tu-token>" \
  -d '{
    "texto": "Excelentes ravioles!",
    "calificacion": 5,
    "publicacionId": 1
  }'
```

---

## 📁 Endpoints de Categorías

### 1. Obtener todas las Categorías
**GET** `/api/categorias`

**Query Parameters**:
- `activo` (opcional): `true` o `false`

**Respuesta (200)**:
```json
{
  "total": 4,
  "categorias": [
    {
      "id": 1,
      "nombre": "Pastas Rellenas",
      "descripcion": "Pastas artesanales rellenas...",
      "activo": true,
      "publicaciones": [
        {
          "id": 1,
          "nombre": "Ravioles",
          "precio": "5800.00",
          "disponible": true
        }
      ]
    }
  ]
}
```

### 2. Obtener una Categoría por ID
**GET** `/api/categorias/:id`

**Respuesta (200)**:
```json
{
  "id": 1,
  "nombre": "Pastas Rellenas",
  "descripcion": "Pastas artesanales rellenas...",
  "activo": true,
  "publicaciones": [...]
}
```

### 3. Crear Categoría (Admin)
**POST** `/api/categorias`  
**Requiere**: Token de Admin

**Body**:
```json
{
  "nombre": "Pizzas",
  "descripcion": "Pizzas artesanales a la piedra",
  "activo": true
}
```

### 4. Actualizar Categoría (Admin)
**PUT** `/api/categorias/:id`  
**Requiere**: Token de Admin

**Body**:
```json
{
  "nombre": "Pastas Premium",
  "descripcion": "Nueva descripción",
  "activo": true
}
```

### 5. Eliminar Categoría (Admin)
**DELETE** `/api/categorias/:id`  
**Requiere**: Token de Admin

### 6. Activar/Desactivar Categoría (Admin)
**PATCH** `/api/categorias/:id/toggle`  
**Requiere**: Token de Admin

---

## 🥬 Endpoints de Ingredientes

### 1. Obtener todos los Ingredientes
**GET** `/api/ingredientes`

**Query Parameters**:
- `esAlergeno` (opcional): `true` o `false`

**Respuesta (200)**:
```json
{
  "total": 19,
  "ingredientes": [
    {
      "id": 1,
      "nombre": "Harina 000",
      "esAlergeno": true,
      "descripcion": "Harina de trigo refinada"
    }
  ]
}
```

### 2. Obtener un Ingrediente por ID
**GET** `/api/ingredientes/:id`

**Respuesta (200)**:
```json
{
  "id": 1,
  "nombre": "Harina 000",
  "esAlergeno": true,
  "descripcion": "Harina de trigo refinada",
  "publicaciones": [
    {
      "id": 1,
      "nombre": "Ravioles",
      "precio": "5800.00",
      "PublicacionIngrediente": {
        "cantidad": "500g"
      }
    }
  ]
}
```

### 3. Obtener solo Alérgenos
**GET** `/api/ingredientes/alergenos/lista`

**Respuesta (200)**:
```json
{
  "total": 6,
  "alergenos": [
    {
      "id": 1,
      "nombre": "Harina 000",
      "esAlergeno": true,
      "descripcion": "Harina de trigo refinada"
    }
  ]
}
```

### 4. Crear Ingrediente (Admin)
**POST** `/api/ingredientes`  
**Requiere**: Token de Admin

**Body**:
```json
{
  "nombre": "Orégano",
  "esAlergeno": false,
  "descripcion": "Orégano seco italiano"
}
```

### 5. Actualizar Ingrediente (Admin)
**PUT** `/api/ingredientes/:id`  
**Requiere**: Token de Admin

### 6. Eliminar Ingrediente (Admin)
**DELETE** `/api/ingredientes/:id`  
**Requiere**: Token de Admin

### 7. Asociar Ingrediente a Publicación (Admin)
**POST** `/api/ingredientes/:id/publicaciones`  
**Requiere**: Token de Admin

**Body**:
```json
{
  "publicacionId": 1,
  "cantidad": "500g"
}
```

### 8. Desasociar Ingrediente de Publicación (Admin)
**DELETE** `/api/ingredientes/:id/publicaciones/:publicacionId`  
**Requiere**: Token de Admin

---

## ⚠️ Códigos de Error Comunes

- `400 Bad Request` - Datos inválidos o faltantes
- `401 Unauthorized` - No autenticado o token inválido
- `403 Forbidden` - No tienes permisos
- `404 Not Found` - Recurso no encontrado
- `409 Conflict` - Conflicto (ej: email ya existe)
- `500 Internal Server Error` - Error del servidor

---

## 📝 Notas Importantes

1. **Tokens JWT**: Expiran en 7 días por defecto
2. **Passwords**: Se encriptan automáticamente con bcrypt
3. **Un comentario por usuario**: Solo puedes comentar una vez por producto
4. **Soft Delete**: Los usuarios se desactivan en lugar de eliminarse
5. **Calificaciones**: Deben ser entre 1 y 5
6. **Relaciones**: Al eliminar una publicación, se eliminan sus comentarios
7. **Categorías**: Las publicaciones pueden tener una categoría asignada
8. **Ingredientes**: Se pueden marcar como alérgenos para filtrado
9. **Asociaciones**: Los ingredientes se relacionan con publicaciones mediante tabla intermedia

---

**Fecha de actualización**: 6 de noviembre de 2025  
**Versión de la API**: 2.0.0
