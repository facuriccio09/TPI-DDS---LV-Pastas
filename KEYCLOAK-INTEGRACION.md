# 🎉 Integración de Keycloak Completada

## ✅ Cambios Realizados

### Backend:
1. ✅ Instaladas dependencias: `keycloak-connect`, `jsonwebtoken`, `jwks-rsa`
2. ✅ Actualizado `.env` con configuración de Keycloak
3. ✅ Reemplazado middleware `auth.js` para validar tokens de Keycloak
4. ✅ Eliminados endpoints `/login` y `/register` (ahora Keycloak los maneja)
5. ✅ Auto-creación de usuarios en BD al primer login con Keycloak

### Frontend:
1. ✅ Instalada dependencia: `keycloak-js`
2. ✅ Reemplazado `AuthContext.jsx` con integración de Keycloak
3. ✅ Actualizado `Login.jsx` para redirigir a Keycloak
4. ✅ Deshabilitada ruta `/register` en `App.jsx`
5. ✅ Creado `silent-check-sso.html` para SSO silencioso

### Keycloak:
1. ✅ Keycloak corriendo en Docker (puerto 8080)
2. ✅ Realm: `lv-pastas`
3. ✅ Client: `lv-pastas-frontend`
4. ✅ Roles: `usuario`, `admin`
5. ✅ Usuarios de prueba:
   - Admin: `admin` / `admin123`
   - Usuario: `usuario` / `usuario123`

---

## 🚀 Cómo Probar

### 1. Verificar que Keycloak esté corriendo:
```bash
sudo docker ps
# Debe aparecer: lv-pastas-keycloak
```

### 2. Iniciar Backend:
```bash
cd backend
npm start
```

### 3. Iniciar Frontend:
```bash
cd frontend-react
npm run dev
```

### 4. Probar el Login:
1. Ir a http://localhost:5173
2. Click en "Iniciar Sesión"
3. Te redirigirá a Keycloak (http://localhost:8080)
4. Ingresa credenciales:
   - **Usuario normal**: `usuario` / `usuario123`
   - **Admin**: `admin` / `admin123`
5. Después del login, volverás a la app autenticado

---

## 🔍 Cómo Funciona

### Flujo de Autenticación:

1. **Usuario hace clic en "Iniciar Sesión"**
   - Frontend redirige a Keycloak

2. **Usuario ingresa credenciales en Keycloak**
   - Keycloak valida usuario/password
   - Genera token JWT firmado

3. **Keycloak redirige de vuelta a la app**
   - Con token JWT en la URL
   - Frontend guarda el token

4. **Cada request al backend incluye el token**
   - Backend valida el token contra Keycloak
   - Extrae roles y usuario del token
   - Si el usuario no existe en BD, lo crea automáticamente

### Ventajas:

- ✅ **Seguridad**: Tokens firmados por Keycloak (RS256)
- ✅ **No guardamos passwords**: Keycloak los maneja
- ✅ **SSO**: Un login para múltiples apps
- ✅ **Refresh tokens**: Renovación automática
- ✅ **Roles centralizados**: Gestionados en Keycloak
- ✅ **Logout seguro**: Invalida tokens en Keycloak

---

## 🔧 Gestión de Usuarios

### Crear nuevos usuarios:
1. Ir a http://localhost:8080
2. Login con `admin` / `admin`
3. Seleccionar realm `lv-pastas`
4. Users → Add user
5. Asignar roles: `usuario` o `admin`

### Cambiar contraseñas:
1. Ir al usuario en Keycloak
2. Credentials → Set password
3. Desactivar "Temporary"

---

## 📝 Notas Importantes

- **Backend puerto**: 3000
- **Frontend puerto**: 5173
- **Keycloak puerto**: 8080
- **Tokens expiran**: Keycloak los refresca automáticamente
- **Primera vez**: Usuario se crea automáticamente en BD al login

---

## 🐛 Troubleshooting

### Error: "CORS"
- Verificar que en Keycloak Client Settings:
  - Web Origins: `*` o `http://localhost:5173`

### Error: "Token inválido"
- Verificar que Keycloak esté corriendo
- Verificar variables en `.env` del backend

### Error: "Cannot GET /realms/lv-pastas"
- Keycloak no está corriendo:
  ```bash
  cd /path/to/proyecto
  sudo docker-compose up -d
  ```

---

¡Keycloak integrado exitosamente! 🎉
