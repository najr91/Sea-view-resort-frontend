# 🌐 Sea View Resort - Frontend

Frontend del sistema de gestión hotelera **Sea View Resort**, desarrollado como parte del **Proyecto Final de RollingCode School**.  
Este módulo, implementado en **React + Vite**, consume la API del backend (Node.js + Express + MongoDB Atlas) y permite a los usuarios registrarse, iniciar sesión, explorar habitaciones y realizar reservas.  

---

## 📌 Funcionalidades

### Rutas principales
- `/` → Página de inicio (Home)
- `/explore` → Explorar el hotel
- `/rooms` → Listado de habitaciones
- `/rooms/:id` → Detalle de una habitación
- `/about` → Sobre el hotel
- `/contact` → Página de contacto
- `/optimize` → Optimización de imágenes
- `*` → Página de error 404

### Autenticación
- `/login` → Inicio de sesión
- `/register` → Registro de usuario
- `/profile` → Perfil (requiere login)
- `/verify-email` → Verificación de correo
- `/forgot-password` → Recuperación de contraseña
- `/password-change` → Cambio de contraseña

### Administración
- `/admin/rooms` → Gestión de habitaciones (acceso administrador)

---

## 🛠️ Tecnologías Utilizadas

- ⚛️ **React 18** con **Vite**
- 🧭 **React Router DOM** (navegación)
- 🔑 **Context API**:
  - `AuthContext` (autenticación)
  - `RoomsContext` (habitaciones)
- 🎨 **TailwindCSS** (estilos base definidos en `index.css`)
- 🔔 **react-hot-toast** (notificaciones y alertas)
- 🚀 **Vercel** (deploy del frontend)

---

## 🚀 Instalación y Ejecución

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tuusuario/seaview-frontend.git
   cd seaview-frontend

npm install
VITE_API_URL=https://seaview-backend.onrender.com/api
npm run dev
npm run build

src/
├── App.jsx              # Definición de rutas principales
├── main.jsx             # Punto de entrada y providers globales
├── index.css            # Estilos base con Tailwind
│
├── layouts/             # Layouts generales (MainLayout)
├── pages/               # Páginas principales
│   ├── Home.jsx
│   ├── Explore.jsx
│   ├── Rooms.jsx
│   ├── RoomDetail.jsx
│   ├── About.jsx
│   ├── Contact.jsx
│   ├── ImageOptimizer.jsx
│   ├── NotFound.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Profile.jsx
│   ├── VerifyEmail.jsx
│   ├── ForgotPassword.jsx
│   ├── PasswordChange.jsx
│   └── admin/
│       └── AdminRooms.jsx
│
├── context/             # Context API (AuthContext, RoomsContext)
├── services/            # Configuración de Axios y llamadas a la API
└── components/          # Componentes UI reutilizables

📡 Consumo de API

El frontend consume el backend mediante Axios, utilizando los siguientes endpoints principales:

Autenticación

POST /api/auth/register → Registro de usuario

POST /api/auth/login → Inicio de sesión

Habitaciones

GET /api/rooms → Listar habitaciones

POST /api/rooms → Crear habitación (admin)

PUT /api/rooms/:id → Editar habitación (admin)

DELETE /api/rooms/:id → Eliminar habitación (admin)

Reservas

POST /api/reservations → Crear reserva

GET /api/reservations/:userId → Ver reservas de un usuario

DELETE /api/reservations/:id → Cancelar reserva

🧪 Validaciones

Validación de formularios (correo electrónico, contraseñas, fechas).

Protección de rutas privadas (ej. /profile, /admin/rooms).

Manejo de errores con mensajes claros utilizando react-hot-toast.

Redirección según rol y autenticación.

Página personalizada para errores 404.

📱 Responsive Design

Diseño adaptable a desktop, tablet y mobile.

Uso de TailwindCSS para un diseño rápido y eficiente.

Componentes reutilizables con estilos consistentes.

🚀 Deploy

El frontend está desplegado en Vercel:
🔗 Sea View Resort - Frontend
 (reemplazar con el enlace real una vez desplegado)

👨‍💻 Autores

Proyecto desarrollado por el equipo de RollingCode School:

Nelson Juarez Rivas

Natividad Rodriguez

Lucia Gallardo

Santiago Nieva

José Perez