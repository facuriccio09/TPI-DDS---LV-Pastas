# 🚀 Inicio Rápido - Para Compañeros de Equipo

## ¿Primera vez con el proyecto? Seguí estos pasos:

---

## 📋 1. Requisitos Previos (instalar si no los tenés)

- ✅ **Node.js** v16+ → https://nodejs.org/
- ✅ **Docker** y **Docker Compose**
- ✅ **Git**

### Instalar Docker en Ubuntu/Debian:
```bash
sudo apt update
sudo apt install docker.io docker-compose -y
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER
```
⚠️ **Importante:** Después de `usermod`, **cerrar sesión y volver a entrar**.

---

## 📥 2. Clonar el Repositorio

```bash
git clone <url-del-repositorio>
cd TPI
```

---

## 🐳 3. Levantar Keycloak (Autenticación)

```bash
# Desde la raíz del proyecto (carpeta TPI/)
docker-compose up -d

# Esperar 10-15 segundos, luego verificar:
docker ps
```

Deberías ver: `lv-pastas-keycloak` corriendo en puerto `8080`.

### 🔐 Configurar Keycloak (SOLO LA PRIMERA VEZ):

1. Ir a: http://localhost:8080
2. Click en **"Administration Console"**
3. Login:
   - Usuario: `admin`
   - Password: `admin`

4. **Crear Realm:**
   - Click en "master" (arriba izquierda) → "Create Realm"
   - Name: `lv-pastas`
   - Click "Create"

5. **Crear Client:**
   - Menú lateral → "Clients" → "Create client"
   - Client ID: `lv-pastas-frontend`
   - Client type: `OpenID Connect`
   - Click "Next"
   - Client authentication: **OFF**
   - Standard flow: **ON**
   - Direct access grants: **ON**
   - Click "Next"
   - Valid redirect URIs: `http://localhost:5173/*`
   - Web origins: `*`
   - Click "Save"

6. **Crear Roles:**
   - Menú lateral → "Realm roles" → "Create role"
   - Crear dos roles:
     - Role name: `usuario` → Save
     - Role name: `admin` → Save

7. **Crear Usuarios de Prueba:**
   - Menú lateral → "Users" → "Create new user"
   
   **Usuario Admin:**
   - Username: `admin`
   - Email: `admin@lavpastas.com`
   - First name: `Admin`
   - Last name: `Sistema`
   - Email verified: **ON**
   - Click "Create"
   - Ir a pestaña "Credentials" → "Set password":
     - Password: `admin123`
     - Temporary: **OFF** ⚠️ (MUY IMPORTANTE)
     - Click "Save"
   - Ir a pestaña "Role mapping" → "Assign role":
     - Seleccionar `usuario` y `admin`
     - Click "Assign"
   
   **Usuario Normal:**
   - Repetir proceso con:
     - Username: `usuario`
     - Email: `usuario@lavpastas.com`
     - Password: `usuario123` (Temporary: **OFF**)
     - Rol: solo `usuario`

✅ **Keycloak configurado!**

---

## 🔧 4. Configurar Backend

```bash
cd backend

# Instalar dependencias
npm install

# Copiar y configurar .env
cp .env.example .env

# El archivo .env ya tiene la configuración correcta:
# KEYCLOAK_URL=http://localhost:8080
# KEYCLOAK_REALM=lv-pastas
# KEYCLOAK_CLIENT_ID=lv-pastas-frontend
```

### Iniciar el backend:
```bash
npm run dev
```

✅ Deberías ver: "🚀 Servidor corriendo en http://localhost:3000"

---

## 🎨 5. Configurar Frontend

**Abrir una NUEVA TERMINAL** (dejar el backend corriendo):

```bash
cd frontend-react

# Instalar dependencias
npm install

# Copiar .env (si no existe)
cp .env.example .env

# Verificar que .env contenga:
# VITE_API_URL=http://localhost:3000/api
```

### Iniciar el frontend:
```bash
npm run dev
```

✅ Deberías ver: "Local: http://localhost:5173/"

---

## 🎉 6. Probar la Aplicación

1. Abrir navegador en: http://localhost:5173
2. Click en "Iniciar Sesión"
3. Login con:
   - Usuario: `admin`
   - Password: `admin123`
4. Deberías ver tu nombre en el navbar
5. Probar "Mi Perfil" y "Admin"

---

## 📝 Resumen de URLs

| Servicio | URL |
|----------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:3000 |
| Keycloak Admin | http://localhost:8080 |

---

## 🔄 Uso Diario (después de la configuración inicial)

### Iniciar todo:
```bash
# Terminal 1: Keycloak (si no está corriendo)
docker-compose up -d

# Terminal 2: Backend
cd backend
npm run dev

# Terminal 3: Frontend
cd frontend-react
npm run dev
```

### Detener todo:
```bash
# Ctrl+C en las terminales del backend y frontend

# Detener Keycloak (opcional):
docker-compose down
```

---

## ❌ Problemas Comunes

### "Error al inicializar Keycloak"
- Verificar que Keycloak esté corriendo: `docker ps`
- Verificar que el realm "lv-pastas" exista
- Verificar que el client "lv-pastas-frontend" exista

### "Token inválido o expirado" (Error 401)
- Cerrar sesión y volver a iniciar sesión
- Verificar que el backend esté corriendo
- Verificar las variables de entorno del backend (.env)

### "Cannot connect to Docker daemon"
- Ejecutar: `sudo systemctl start docker`
- Si sigue fallando: `sudo usermod -aG docker $USER` y **cerrar sesión**

### Los cambios no se reflejan en el frontend
- Hacer un hard refresh: `Ctrl + Shift + R`
- Limpiar caché del navegador

---

## 📚 Documentación Adicional

- **README.md** - Documentación completa del proyecto
- **KEYCLOAK-SETUP.md** - Configuración detallada de Keycloak
- **backend/README.md** - Documentación del backend
- **frontend-react/README.md** - Documentación del frontend
- **DEPENDENCIAS.md** - Lista completa de dependencias

---

## 💬 ¿Necesitás Ayuda?

Si tenés problemas:
1. Verificar que **todos los servicios estén corriendo** (Docker, Backend, Frontend)
2. Revisar los **logs en las terminales** para ver errores específicos
3. Verificar que las **variables de entorno** estén configuradas correctamente
4. Consultar la documentación adicional

---

**¡Listo! Ya podés empezar a trabajar en el proyecto.** 🎉
