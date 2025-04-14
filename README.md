# Aplicación Fullstack de Proyectos Seguros (JWT + PostgreSQL)

Aplicación fullstack con autenticación JWT que permite a los usuarios registrarse, iniciar sesión y gestionar proyectos personales mediante operaciones CRUD. Desarrollada con React, Node.js, Express y PostgreSQL, con prácticas de seguridad modernas.

## 🚀 Tecnologías utilizadas

### Frontend:
- React 19 + Vite
- React Router DOM v7
- Bootstrap 5
- Axios

### Backend:
- Node.js + Express 5
- PostgreSQL
- JWT (jsonwebtoken)
- Bcrypt
- Cookie-Parser
- CORS

## 📁 Estructura del proyecto

```
JWT/
├── client/           # Frontend (React + Vite)
│   ├── src/
│   ├── public/
│   └── ...
├── server/           # Backend (Node.js + Express)
│   ├── src/
│   └── ...
├── database/         # Script .sql de la base de datos
│   └── export_db.sql
└── README.md
```

## 🔧 Instalación del proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/Oliveresm/Aplicaci-n-Fullstack-de-Proyectos-Seguros-JWT-PostgreSQL-.git
cd JWT
```

### 2. Instalar dependencias

**Backend:**

```bash
cd server
npm install
```

**Frontend:**

```bash
cd ../client
npm install
```

## 🗃️ Configuración de base de datos

1. Crear una base de datos PostgreSQL (por ejemplo: `jwtlogin`)
2. Importar el archivo `export_db.sql`:

```bash
psql -U tu_usuario -d jwtlogin -f database/export_db.sql
```

3. Asegúrate de tener configurado tu archivo `.env` en el backend con tu conexión:

```env
DATABASE_URL=postgres://usuario:contraseña@localhost:5432/jwtlogin
JWT_SECRET=tu_clave_secreta
```

> ⚠️ Asegúrate de que el usuario y puerto coincidan con tu configuración local de PostgreSQL.

## 🏃 Ejecutar el proyecto

**Backend (desde `/server`):**

```bash
npm run dev
```

**Frontend (desde `/client`):**

```bash
npm run dev
```

## 🔐 Funcionalidades principales

- Registro y login de usuarios
- Autenticación con JWT y manejo de tokens seguros
- Cookies httpOnly para proteger el token
- CRUD de proyectos (crear, leer, actualizar y eliminar)
- Validación por usuario: cada quien ve y edita sus propios proyectos
- Seguridad en backend con roles y validación de identidad
- Exportación de base de datos SQL para fácil restauración



## ✨ Autor

**Oliver (Oliveresm)**  
💻 Proyecto académico con enfoque en autenticación segura, arquitectura modular y prácticas modernas de desarrollo fullstack.
