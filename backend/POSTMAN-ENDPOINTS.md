# 📡 Endpoints para Postman

**Base URL**: `http://localhost:3000/api`

---

## 🔑 Credenciales de Prueba

### Admin
```
Email: admin@lavesubiana.com
Password: admin123
```

### Usuario Normal
```
Email: maria.gonzalez@example.com
Password: 123456
```

---

## 📝 Endpoints a Probar

### 1. **Login Admin**
```
POST http://localhost:3000/api/usuarios/login
Body (JSON):
{
  "email": "admin@lavesubiana.com",
  "password": "admin123"
}
```
→ Copiar el `token` de la respuesta

---

### 2. **Login Usuario**
```
POST http://localhost:3000/api/usuarios/login
Body (JSON):
{
  "email": "maria.gonzalez@example.com",
  "password": "123456"
}
```
→ Copiar el `token` de la respuesta

---

### 3. **Ver Perfil** (requiere token)
```
GET http://localhost:3000/api/usuarios/perfil
Headers:
Authorization: Bearer <tu-token>
```

---

### 4. **Listar Productos** (público)
```
GET http://localhost:3000/api/publicaciones
```

---

### 5. **Ver Producto con Comentarios** (público)
```
GET http://localhost:3000/api/publicaciones/1
```

---

### 6. **Filtrar Productos Destacados** (público)
```
GET http://localhost:3000/api/publicaciones?destacado=true
```

---

### 7. **Crear Comentario** (requiere token de usuario)
```
POST http://localhost:3000/api/comentarios
Headers:
Authorization: Bearer <token-usuario>
Body (JSON):
{
  "texto": "Excelentes ravioles! Los mejores que he probado",
  "calificacion": 5,
  "publicacionId": 1
}
```

---

### 8. **Crear Producto** (requiere token de admin)
```
POST http://localhost:3000/api/publicaciones
Headers:
Authorization: Bearer <token-admin>
Body (JSON):
{
  "nombre": "Agnolottis",
  "descripcion": "Deliciosos agnolottis rellenos",
  "precio": 7000.00,
  "ingredientes": "Harina, Huevos, Carne, Queso",
  "variantes": ["Carne", "Pollo"],
  "categoria": "Pastas Rellenas",
  "disponible": true,
  "destacado": false
}
```

---

### 9. **Actualizar Precio** (requiere token de admin)
```
PUT http://localhost:3000/api/publicaciones/1
Headers:
Authorization: Bearer <token-admin>
Body (JSON):
{
  "precio": 6200.00
}
```

---

### 10. **Ver Comentarios de un Producto** (público)
```
GET http://localhost:3000/api/comentarios/publicacion/1
```

---

### 11. **Listar Categorías** (público)
```
GET http://localhost:3000/api/categorias
```

---

### 12. **Ver Categoría con Productos** (público)
```
GET http://localhost:3000/api/categorias/1
```

---

### 13. **Crear Categoría** (requiere token de admin)
```
POST http://localhost:3000/api/categorias
Headers:
Authorization: Bearer <token-admin>
Body (JSON):
{
  "nombre": "Pizzas",
  "descripcion": "Pizzas artesanales a la piedra",
  "activo": true
}
```

---

### 14. **Listar Ingredientes** (público)
```
GET http://localhost:3000/api/ingredientes
```

---

### 15. **Listar solo Alérgenos** (público)
```
GET http://localhost:3000/api/ingredientes/alergenos/lista
```

---

### 16. **Ver Ingrediente con sus Productos** (público)
```
GET http://localhost:3000/api/ingredientes/1
```

---

### 17. **Crear Ingrediente** (requiere token de admin)
```
POST http://localhost:3000/api/ingredientes
Headers:
Authorization: Bearer <token-admin>
Body (JSON):
{
  "nombre": "Orégano",
  "esAlergeno": false,
  "descripcion": "Orégano seco italiano"
}
```

---

### 18. **Asociar Ingrediente a Producto** (requiere token de admin)
```
POST http://localhost:3000/api/ingredientes/1/publicaciones
Headers:
Authorization: Bearer <token-admin>
Body (JSON):
{
  "publicacionId": 5,
  "cantidad": "50g"
}
```

---

### 19. **Filtrar Ingredientes Alérgenos** (público)
```
GET http://localhost:3000/api/ingredientes?esAlergeno=true
```

---

### 20. **Filtrar Categorías Activas** (público)
```
GET http://localhost:3000/api/categorias?activo=true
```

---

## 💡 Tips para Postman

1. **Guardar el token**: En Postman, crea una variable de entorno para el token
2. **Colección**: Crea una colección para organizar las peticiones
3. **Pre-request Scripts**: Puedes automatizar el login y guardar el token automáticamente
4. **Variables de entorno**: 
   - `baseURL`: `http://localhost:3000/api`
   - `token`: El token JWT que obtienes del login
   - `adminToken`: Token del admin
   - `userToken`: Token del usuario normal

---

## 🎯 Flujo de Prueba Recomendado

### Autenticación
1. Login Admin → Guardar token
2. Login Usuario → Guardar token  

### Endpoints Públicos
3. Listar productos (sin auth)
4. Ver producto con reviews (sin auth)
5. Listar categorías
6. Listar ingredientes
7. Ver solo alérgenos

### Endpoints de Usuario
8. Ver perfil (con token usuario)
9. Crear comentario (con token usuario)

### Endpoints de Admin
10. Crear producto (con token admin)
11. Actualizar producto (con token admin)
12. Crear categoría (con token admin)
13. Crear ingrediente (con token admin)
14. Asociar ingrediente a producto (con token admin)
15. Intentar crear producto con token de usuario (debe fallar con 403)

---

## 📊 Resumen de Endpoints

**Total de endpoints**: 38+

### Por Módulo:
- **Usuarios**: 7 endpoints
- **Publicaciones**: 6 endpoints
- **Comentarios**: 7 endpoints
- **Categorías**: 6 endpoints (NUEVO)
- **Ingredientes**: 9 endpoints (NUEVO)

### Por Tipo de Acceso:
- **Públicos**: ~15 endpoints
- **Requieren autenticación**: ~8 endpoints
- **Solo Admin**: ~15 endpoints

---

**Última actualización**: 6 de noviembre de 2025  
**Versión API**: 2.0.0
