# PawPals App 


PawPals es una aplicación web que conecta a dueños de perros para organizar paseos, socializar mascotas y gestionar perfiles de perros.  
Este repositorio contiene el **frontend desarrollado con React (Vite)**, que consume la API REST creada con Spring Boot.

---

## 🚀 Tecnologías Utilizadas

- React 18
- Vite 6
- React Router DOM 7
- Bootstrap 5 + Bootstrap Icons


---

## 📦 Instalación y Ejecución

### 1. Clona el repositorio
```
git clone https://github.com/USER/PawPalsApp.git
```

### 2. Instala las dependencias
```
npm install
```

### 3. Configura variables de entorno
```
VITE_API_URL=http://localhost:8080
```

### 4. Servidor de desarrollo
```
npm run dev
```

### 5. Build producción
```
npm run build
```

---

## 🧭 Estructura del Proyecto
```
src/
├── api/
├── components/
├── pages/
├── context/
├── hooks/
├── utils/
├── assets/
├── App.jsx
└── main.jsx
```

---

## 🔐 Autenticación
Manejo de sesión con:
- AuthContext
- useAuth()
- ProtectedRoute

JWT almacenado en localStorage.

---

## 🐶 Funcionalidades Principales
- Registro e inicio de sesión
- Gestión de perros (CRUD)
- Seguimiento de perros (PawFriends)
- Gestión de paseos (crear, listar, unirse, editar, cancelar)
- Dashboard principal
- Landing page

---


## 🌐 Comunicación con la API
Ejemplo:
```js
import { getUpcomingWalks } from "../api/walks";
const walks = await getUpcomingWalks(token);
```

---

## 🎨 Diseño
- Bootstrap 5
- Diseño responsive
- Iconos Bootstrap Icons
- Colores corporativos

---

## 🔧 Scripts
```
npm run dev
npm run build
npm run preview
npm run lint
```
