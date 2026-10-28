# 🛒 Inventario y Tienda Web (UVM Shop)

Sistema web completo (Frontend + Backend) para la gestión de inventario y catálogo de productos, con autenticación segura, control de roles (Administrador y Usuario), base de datos en la nube y gestión de estado global con Redux.

---

## 📋 Requisitos Previos (¿Qué necesitas instalar?)

Solo necesitas tener instalado en tu computadora:

1. **Node.js** (versión 18 o superior): Puedes descargarlo gratis desde [nodejs.org](https://nodejs.org/).
   * Al instalar Node.js, se instala automáticamente `npm`.
2. **Navegador Web**: Google Chrome, Edge, Firefox, etc.
3. **Conexión a Internet**: Para conectar con la base de datos MongoDB Atlas.

> 💡 **Nota:** No necesitas instalar MongoDB localmente en tu PC, ya que usamos una base de datos en la nube (MongoDB Atlas).

---

## 🚀 ¿Cómo Ejecutar el Proyecto? (Paso a Paso)

Para probar el proyecto completo se abren **dos terminales**:

### Terminal 1: Iniciar el Backend (Servidor)

1. Abre una terminal y ve a la carpeta del backend:
   ```bash
   cd c:\Users\khyso\Downloads\Front-unidad-2.1-el-backend-main
   ```
2. Instala las dependencias (solo la primera vez):
   ```bash
   npm install
   ```
3. Inicia el servidor:
   ```bash
   npm run dev
   ```
   *(O si prefieres, `npm start`)*.  
   👉 Verás el mensaje: `Servidor corriendo en http://localhost:5000` y `Conectado a MongoDB Atlas correctamente`.

---

### Terminal 2: Iniciar el Frontend (Página Web)

1. Abre una segunda terminal y ve a la carpeta del frontend:
   ```bash
   cd c:\Users\khyso\Downloads\Front-unidad-2.1-front-main\Front-unidad-2.1-front-main
   ```
2. Instala las dependencias (solo la primera vez):
   ```bash
   npm install
   ```
3. Inicia la aplicación:
   ```bash
   npm run dev
   ```
4. Abre en tu navegador el enlace que aparece en pantalla:
   👉 **http://localhost:5173/**

---

## 🔑 Credenciales de Acceso para Pruebas

El sistema crea automáticamente un usuario Administrador al iniciar el servidor por primera vez:

* **Cuenta Administrador:**
  * **Email:** `admin@invsis.com`
  * **Contraseña:** `admin`
  * *Permisos:* Puede editar o eliminar cualquier producto, administrar categorías y gestionar la tabla de usuarios.

* **Cuenta de Usuario Normal:**
  * Puedes registrarte directamente desde el botón **"Registrarse"** de la página web.
  * *Permisos:* Puede vender sus propios productos, editar lo que haya publicado y guardar artículos en su lista de favoritos.

---

## 🧩 Custom Hooks Creados y su Función

En la carpeta `src/hooks/` se crearon y utilizaron los siguientes custom hooks para hacer el código ordenado y fácil de mantener:

1. **`useAuth`**:
   * **¿Qué hace?:** Controla todo lo relacionado con el usuario y su sesión.
   * **Función:** Permite iniciar sesión (`login`), registrar nuevos usuarios (`registrar`), cerrar sesión (`logout`) y consultar si el usuario conectado es Administrador o cliente normal.

2. **`useProductos`**:
   * **¿Qué hace?:** Gestiona el catálogo de productos con Redux.
   * **Función:** Permite cargar los productos desde la base de datos, buscarlos por nombre en tiempo real, filtrarlos por categoría, cambiar de página, crear nuevos productos, editarlos y eliminarlos.

3. **`useFavoritos`**:
   * **¿Qué hace?:** Administra la lista de deseos de cada usuario.
   * **Función:** Permite agregar un producto a favoritos (haciendo clic en la estrella ⭐), consultar la lista de favoritos en una tabla y eliminarlos cuando ya no se deseen.

4. **`useUI`**:
   * **¿Qué hace?:** Controla la navegación visual y las ventanas emergentes (modales).
   * **Función:** Permite cambiar entre las 8 secciones de la página web (sin necesidad de usar React Router) y abrir o cerrar los modales de login, registro, etc.

5. **`useForm`**:
   * **¿Qué hace?:** Facilita el manejo de los datos dentro de los formularios.
   * **Función:** Guarda automáticamente lo que el usuario escribe en los campos de texto, previene recargas innecesarias y limpia los formularios al terminar de enviar la información.

6. *(Bonus)* **`useCategorias`**:
   * **¿Qué hace?:** Controla el CRUD de categorías de productos.
   * **Función:** Permite listar las categorías en una tabla, crear nuevas categorías, editarlas y borrarlas.

---

## 📌 Las 8 Secciones de la Aplicación

La navegación lateral (Sidebar) y el menú superior móvil cuentan con 8 secciones relevantes:

1. **🏠 Inicio (Landing Page):** Presentación atractiva de la tienda con beneficios y accesos directos.
2. **🛒 Tienda y Productos:** Catálogo con paginación, filtros de búsqueda y selector entre **Vista Cuadrícula** y **Vista Tabla (CRUD)**.
3. **🏷️ Categorías (CRUD):** Tabla interactiva para crear, ver, modificar y eliminar categorías.
4. **⭐ Mis Favoritos:** Tabla dedicada donde el usuario puede ver y gestionar sus artículos guardados.
5. **ℹ️ Sobre Nosotros:** Misión, visión, valores y descripción de la empresa.
6. **❓ Preguntas Frecuentes (FAQ):** Acordeón interactivo con respuestas a dudas habituales.
7. **📩 Contacto y Soporte:** Datos de atención y formulario interactivo para enviar mensajes.
8. **👥 Usuarios (Admin):** Tabla exclusiva para administradores donde se pueden consultar, modificar o eliminar usuarios.

---

## ✅ Resumen de Cumplimiento de Requerimientos

| Requerimiento | Estado | Cómo se cumple |
|---|:---:|---|
| **Mínimo 3 entidades con CRUD** | ✅ Cumple | **Productos**, **Categorías** y **Usuarios** cuentan con Crear, Leer, Actualizar y Eliminar completos (más Favoritos). |
| **Formularios para entidades** | ✅ Cumple | Formularios modales para Productos, Categorías, Usuarios y Contacto, todos gestionados con `useForm`. |
| **Tablas para manejar entidades** | ✅ Cumple | Todas las entidades cuentan con visualización y botones de acción en tablas responsivas (`<Table responsive>`). |
| **Backend Propio** | ✅ Cumple | Desarrollado con Node.js, Express, MongoDB Atlas, Mongoose, JWT y validaciones. |
| **Mínimo 6 secciones relevantes** | ✅ Cumple | El sistema incluye **8 secciones** navegables y funcionales. |
| **Landing Page (sin React Router)** | ✅ Cumple | Implementada en `InicioView.jsx` mediante cambio de vistas controlado por Redux (`vistaActual`). |
| **Diseño 100% Responsive** | ✅ Cumple | Adaptable a celulares, tablets y PC mediante Bootstrap y menú móvil hamburguesa. |
| **5 Custom Hooks propios** | ✅ Cumple | Se usan activamente `useAuth`, `useProductos`, `useFavoritos`, `useUI` y `useForm` (más `useCategorias`). |
| **Uso de REDUX como estado global** | ✅ Cumple | Configurado con Redux Toolkit (`store.js`) con 5 slices conectados a la interfaz mediante AsyncThunks. |

---

## ⚙️ Configuración del Archivo `config.env` (Backend)

Ubicado en `c:\Users\khyso\Downloads\Front-unidad-2.1-el-backend-main\config.env`:

```env
PORT=5000
MONGO_URI=mongodb+srv://robertagf907_db_user:4SApIBhOvzpTeIBD@cluster0.tzxceqf.mongodb.net/BD?retryWrites=true&w=majority

ADMIN_USERNAME=admin
ADMIN_NOMBRE=Admin
ADMIN_EMAIL=admin@invsis.com
ADMIN_PASSWORD=admin
ADMIN_ROL=admin

JWT_SECRET=uvmpanas1337_secret_key_development
JWT_EXPIRE=24h
```
