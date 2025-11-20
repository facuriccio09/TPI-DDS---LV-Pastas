# 🔐 Configuración de Keycloak para LV Pastas

## ✅ Paso 1: Keycloak está corriendo

Keycloak está levantado en: **http://localhost:8080**

Credenciales de admin:
- Usuario: `admin`
- Password: `admin`

---

## 📋 Paso 2: Configurar Keycloak (Manual)

### 2.1 Acceder a la Consola de Admin

1. Abrí tu navegador y andá a: **http://localhost:8080**
2. Click en **Administration Console**
3. Ingresá:
   - Username: `admin`
   - Password: `admin`

### 2.2 Crear un Realm

1. En el menú de la izquierda, hacé click en el dropdown que dice **master**
2. Click en **Create Realm**
3. Ingresá:
   - **Realm name**: `lv-pastas`
   - Click en **Create**

### 2.3 Crear un Client

1. En el menú izquierdo, click en **Clients**
2. Click en **Create client**
3. En la pestaña **General Settings**:
   - **Client type**: OpenID Connect
   - **Client ID**: `lv-pastas-frontend`
   - Click en **Next**
4. En la pestaña **Capability config**:
   - ✅ **Client authentication**: OFF (es un cliente público)
   - ✅ **Authorization**: OFF
   - ✅ **Authentication flow**:
     - ✅ Standard flow
     - ✅ Direct access grants
   - Click en **Next**
5. En la pestaña **Login settings**:
   - **Valid redirect URIs**: 
     - `http://localhost:5173/*`
     - `http://localhost:3000/*`
   - **Valid post logout redirect URIs**:
     - `http://localhost:5173/*`
     - `http://localhost:3000/*`
   - **Web origins**: `*` (o `http://localhost:5173`)
   - Click en **Save**

### 2.4 Crear Roles

1. En el menú izquierdo, click en **Realm roles**
2. Click en **Create role**
3. Crear rol **usuario**:
   - **Role name**: `usuario`
   - Click en **Save**
4. Click en **Create role** nuevamente
5. Crear rol **admin**:
   - **Role name**: `admin`
   - Click en **Save**

### 2.5 Crear Usuarios de Prueba

#### Usuario Admin:
1. En el menú izquierdo, click en **Users**
2. Click en **Add user**
3. Ingresá:
   - **Username**: `admin`
   - **Email**: `admin@lvpastas.com`
   - **First name**: `Admin`
   - **Last name**: `Sistema`
   - ✅ **Email verified**: ON
   - Click en **Create**
4. Click en la pestaña **Credentials**
   - Click en **Set password**
   - **Password**: `admin123`
   - **Password confirmation**: `admin123`
   - ❌ **Temporary**: OFF
   - Click en **Save**
5. Click en la pestaña **Role mapping**
   - Click en **Assign role**
   - Seleccioná **admin** y **usuario**
   - Click en **Assign**

#### Usuario Normal:
1. Click en **Users** → **Add user**
2. Ingresá:
   - **Username**: `usuario`
   - **Email**: `usuario@test.com`
   - **First name**: `Usuario`
   - **Last name**: `Prueba`
   - ✅ **Email verified**: ON
   - Click en **Create**
3. Click en la pestaña **Credentials**
   - **Password**: `usuario123`
   - **Password confirmation**: `usuario123`
   - ❌ **Temporary**: OFF
   - Click en **Save**
4. Click en la pestaña **Role mapping**
   - Seleccioná **usuario**
   - Click en **Assign**

---

## 🔧 Paso 3: Obtener Configuración

1. En el menú izquierdo, click en **Realm settings**
2. Click en **OpenID Endpoint Configuration** (al final de la página)
3. Guardá esta URL, la vamos a necesitar:
   ```
   http://localhost:8080/realms/lv-pastas/.well-known/openid-configuration
   ```

---

## ✅ Resumen de Configuración

- **Realm**: `lv-pastas`
- **Client ID**: `lv-pastas-frontend`
- **Roles**: `usuario`, `admin`
- **Usuarios de prueba**:
  - Admin: `admin` / `admin123`
  - Usuario: `usuario` / `usuario123`

---

## 🚀 Próximos Pasos

Una vez completada esta configuración manual, vamos a:

1. ✅ Instalar dependencias en el backend
2. ✅ Modificar el middleware de autenticación
3. ✅ Instalar Keycloak en el frontend
4. ✅ Modificar el AuthContext
5. ✅ Probar el login

**¡Avisame cuando hayas terminado la configuración en Keycloak!**
