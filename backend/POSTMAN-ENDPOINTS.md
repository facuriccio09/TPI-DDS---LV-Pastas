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

## 💡 Tips para Postman

1. **Guardar el token**: En Postman, crea una variable de entorno para el token
2. **Colección**: Crea una colección para organizar las peticiones
3. **Pre-request Scripts**: Puedes automatizar el login y guardar el token automáticamente

---

## 🎯 Flujo de Prueba Recomendado

1. Login Admin → Guardar token
2. Login Usuario → Guardar token  
3. Listar productos (sin auth)
4. Ver producto con reviews (sin auth)
5. Crear comentario (con token usuario)
6. Crear producto (con token admin)
7. Actualizar producto (con token admin)
8. Intentar crear producto con token de usuario (debe fallar con 403)
