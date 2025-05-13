# 🚀 Proyecto Integrador — MyCodeStage

Plataforma web para gestión de portafolios de proyectos con autenticación JWT, carga de imágenes, calificaciones por estrellas y verificación por correo.  
Incluye servidor **HTTPS** para mayor seguridad.

---

## 🧩 Tecnologías

- **Frontend**: React + Vite
- **Backend**: Express.js (HTTPS habilitado)
- **Base de Datos**: PostgreSQL
- **Autenticación**: JWT + Refresh Tokens
- **Seguridad**: HTTPS, Cookies HttpOnly, .env, bcrypt
- **Correo**: Nodemailer + Gmail

---

## ⚙️ Instalación

### 1. Clona el repositorio

```bash
git clone https://github.com/TU_USUARIO/TU_REPO.git
cd Proyecto-Integrador
```

### 2. Instala dependencias

```bash
cd server
npm install

cd ../client
npm install
```

---

## 🔐 Variables de entorno

### 📁 `/server/.env`

```env
EMAIL_USER=tu_correo@gmail.com
EMAIL_PASS=tu_contraseña_de_app
EMAIL_FROM="MyCodeStage <tu_correo@gmail.com>"

DB_USER=usuario
DB_HOST=localhost
DB_NAME=proyect_jwt
DB_PASSWORD=admin123
DB_PORT=5432

FRONTEND_URL=https://TU_IP_LOCAL:5173
BACKEND_URL=https://TU_IP_LOCAL:3000
PORT=3000
```

### 📁 `/client/.env`

```env
VITE_BACKEND_URL=https://TU_IP_LOCAL:3000
VITE_FRONTEND_URL=https://TU_IP_LOCAL:5173
```

---

## 🛡️ HTTPS local

Certificados locales generados con OpenSSL:

```bash
openssl req -nodes -new -x509 -keyout key.pem -out cert.pem -days 365
```

Coloca `key.pem` y `cert.pem` en la raíz del proyecto.  
No los subas a GitHub (`.gitignore` lo bloquea).

---

## 🚦 Cómo ejecutar

### Backend (HTTPS)
```bash
cd server
npm run dev
```

### Frontend
```bash
cd client
npm run dev -- --host
```

---

## ✅ Funcionalidades

- [x] Registro con verificación por correo
- [x] Inicio de sesión con JWT y Refresh Token
- [x] Subida de imágenes y archivos
- [x] Calificación de proyectos con estrellas
- [x] Comentarios y eliminación por usuario
- [x] Recuperación de contraseña
- [x] HTTPS con certificado autofirmado

---

