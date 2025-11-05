# ⚡ Comandos Útiles - L.V Pastas Frescas

## 🚀 Inicio del Proyecto

### Primera vez (Setup completo)
```bash
# Clonar repositorio
git clone <url-repositorio>
cd TPI

# Backend
cd backend
npm install
cp .env.example .env
npm run dev

# Frontend (en otra terminal)
cd ../frontend-react
npm install
cp .env.example .env
npm run dev
```

### Días siguientes
```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
cd frontend-react && npm run dev
```

---

## 📦 NPM - Gestión de Dependencias

### Instalar
```bash
npm install                    # Instalar todas las dependencias
npm install <paquete>          # Instalar un paquete
npm install -D <paquete>       # Instalar como dev dependency
npm install <paquete>@latest   # Instalar última versión
```

### Actualizar
```bash
npm outdated                   # Ver paquetes desactualizados
npm update                     # Actualizar todos los paquetes
npm update <paquete>           # Actualizar un paquete específico
```

### Desinstalar
```bash
npm uninstall <paquete>        # Desinstalar un paquete
```

### Limpiar caché
```bash
npm cache clean --force        # Limpiar caché de npm
rm -rf node_modules            # Eliminar node_modules
rm package-lock.json           # Eliminar package-lock.json
npm install                    # Reinstalar todo
```

---

## 🔄 Git - Control de Versiones

### Setup inicial
```bash
git init                       # Inicializar repositorio
git add .                      # Agregar todos los archivos
git commit -m "Initial commit" # Primer commit
git remote add origin <url>    # Conectar con remoto
git push -u origin main        # Subir a remoto
```

### Flujo diario
```bash
git status                     # Ver estado actual
git add .                      # Agregar cambios
git commit -m "mensaje"        # Hacer commit
git push                       # Subir cambios
git pull                       # Descargar cambios
```

### Branches
```bash
git branch                     # Ver branches
git branch <nombre>            # Crear branch
git checkout <nombre>          # Cambiar a branch
git checkout -b <nombre>       # Crear y cambiar a branch
git merge <nombre>             # Fusionar branch
git branch -d <nombre>         # Eliminar branch
```

### Ver historial
```bash
git log                        # Ver commits
git log --oneline              # Ver commits en una línea
git log --graph                # Ver historial gráfico
```

### Deshacer cambios
```bash
git checkout -- <archivo>      # Descartar cambios de un archivo
git reset HEAD <archivo>       # Quitar del staging
git reset --hard HEAD          # Descartar todos los cambios
git revert <commit>            # Revertir un commit
```

---

## 🗄️ Base de Datos (SQLite + Sequelize)

### Comandos útiles (dentro de Node.js)
```javascript
// Sincronizar DB (crear tablas)
await sequelize.sync();

// Sincronizar y actualizar columnas
await sequelize.sync({ alter: true });

// Borrar y recrear tablas (CUIDADO!)
await sequelize.sync({ force: true });

// Ver queries SQL
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: console.log  // Ver queries
});
```

### Resetear base de datos
```bash
# Desde la carpeta backend
rm database.sqlite             # Eliminar DB
npm run dev                    # Reiniciar (se crea automáticamente)
```

---

## 🔍 Búsqueda y Debug

### Buscar en archivos
```bash
grep -r "texto" .              # Buscar texto en todos los archivos
grep -r "texto" --include="*.js" .  # Buscar solo en .js
find . -name "*.js"            # Encontrar todos los .js
```

### Ver puertos en uso
```bash
lsof -i :3000                  # Ver qué usa el puerto 3000
lsof -i :5173                  # Ver qué usa el puerto 5173
kill -9 <PID>                  # Matar proceso por PID
```

### Logs y debugging
```bash
# Backend
npm run dev                    # Los logs aparecen en terminal

# Frontend  
npm run dev                    # Abrir console en navegador (F12)
```

---

## 🧪 Testing y Verificación

### Probar Backend
```bash
# Con curl
curl http://localhost:3000
curl http://localhost:3000/api/usuarios
curl -X POST http://localhost:3000/api/usuarios/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"123456"}'

# Con navegador
# Abrir: http://localhost:3000
```

### Probar Frontend
```bash
# Abrir en navegador
http://localhost:5173

# Ver errores en consola
F12 (Chrome/Firefox) -> Console
```

---

## 📝 Archivos y Directorios

### Crear archivos/carpetas
```bash
mkdir <carpeta>                # Crear carpeta
touch <archivo>                # Crear archivo vacío
code <archivo>                 # Abrir en VS Code
```

### Copiar/mover/eliminar
```bash
cp <origen> <destino>          # Copiar archivo
cp -r <origen> <destino>       # Copiar carpeta
mv <origen> <destino>          # Mover/renombrar
rm <archivo>                   # Eliminar archivo
rm -rf <carpeta>               # Eliminar carpeta
```

### Ver contenido
```bash
ls                             # Listar archivos
ls -la                         # Listar con detalles
cat <archivo>                  # Ver contenido
head <archivo>                 # Ver primeras líneas
tail <archivo>                 # Ver últimas líneas
tail -f <archivo>              # Ver archivo en tiempo real
```

---

## 🔐 Variables de Entorno

### Verificar variables
```bash
# Backend
cat backend/.env               # Ver archivo .env
echo $PORT                     # Ver variable específica

# Frontend
cat frontend-react/.env
```

### Editar variables
```bash
# Con VS Code
code backend/.env

# Con nano
nano backend/.env
```

---

## 🚀 Build y Producción

### Backend
```bash
cd backend
npm start                      # Ejecutar en producción
```

### Frontend
```bash
cd frontend-react
npm run build                  # Crear build de producción
npm run preview                # Previsualizar build
```

---

## 📊 Información del Sistema

### Versiones
```bash
node --version                 # Versión de Node.js
npm --version                  # Versión de npm
git --version                  # Versión de Git
```

### Información del proyecto
```bash
npm list                       # Ver dependencias instaladas
npm list --depth=0             # Ver solo dependencias directas
npm list <paquete>             # Ver info de un paquete específico
```

---

## 🔧 Scripts del Proyecto

### Backend (package.json)
```bash
npm start                      # node src/server.js
npm run dev                    # nodemon src/server.js
```

### Frontend (package.json)
```bash
npm run dev                    # vite
npm run build                  # vite build
npm run preview                # vite preview
```

---

## 🎯 Atajos de Desarrollo

### Terminal
```bash
Ctrl + C                       # Detener proceso
Ctrl + L                       # Limpiar terminal
Ctrl + R                       # Buscar en historial
```

### VS Code
```bash
Ctrl + `                       # Abrir/cerrar terminal
Ctrl + P                       # Buscar archivo
Ctrl + Shift + P               # Paleta de comandos
Ctrl + B                       # Toggle sidebar
Ctrl + /                       # Comentar línea
```

### Navegador (DevTools)
```bash
F12                            # Abrir DevTools
Ctrl + Shift + C               # Inspector de elementos
Ctrl + Shift + I               # Abrir consola
```

---

## 🆘 Solución de Problemas

### Backend no inicia
```bash
# Verificar puerto
lsof -i :3000

# Limpiar y reinstalar
cd backend
rm -rf node_modules package-lock.json
npm install

# Verificar .env
cat .env
```

### Frontend no inicia
```bash
# Verificar puerto
lsof -i :5173

# Limpiar y reinstalar
cd frontend-react
rm -rf node_modules package-lock.json
npm install

# Verificar .env
cat .env
```

### Error de permisos
```bash
sudo chown -R $USER:$USER .    # Cambiar permisos
```

### Conflictos de Git
```bash
git status                     # Ver conflictos
# Resolver manualmente en los archivos
git add .
git commit -m "Resolver conflictos"
```

---

## 📚 Comandos de Documentación

### Ver README
```bash
cat README.md                  # Ver en terminal
code README.md                 # Abrir en VS Code
```

### Buscar en documentación
```bash
grep -r "palabra" *.md         # Buscar en todos los .md
```

---

## 🔄 Workflows Comunes

### Empezar a trabajar en una feature nueva
```bash
git pull                       # Actualizar código
git checkout -b feature/nombre # Crear branch
code .                         # Abrir en VS Code
npm run dev                    # Iniciar desarrollo
```

### Subir cambios
```bash
git add .
git commit -m "feat: descripción"
git push origin feature/nombre
# Crear Pull Request en GitHub
```

### Actualizar desde main
```bash
git checkout main
git pull
git checkout feature/nombre
git merge main
```

---

## 💡 Tips Productividad

### Alias útiles (agregar a ~/.bashrc o ~/.zshrc)
```bash
alias gs='git status'
alias ga='git add .'
alias gc='git commit -m'
alias gp='git push'
alias gl='git log --oneline'
alias nrd='npm run dev'
alias ns='npm start'
```

### Recargar alias
```bash
source ~/.bashrc               # Para bash
source ~/.zshrc                # Para zsh
```

---

## 📌 Referencias Rápidas

### Documentación del proyecto
- `README.md` - Documentación principal
- `GUIA-RAPIDA.md` - Inicio rápido
- `DEPENDENCIAS.md` - Info de dependencias
- `ESTADO-PROYECTO.md` - Estado actual
- `COMANDOS.md` - Este archivo

### URLs importantes
- Backend: http://localhost:3000
- Frontend: http://localhost:5173
- GitHub: <url-repositorio>

---

**Última actualización**: 5 de noviembre de 2025  
**Versión**: 1.0
