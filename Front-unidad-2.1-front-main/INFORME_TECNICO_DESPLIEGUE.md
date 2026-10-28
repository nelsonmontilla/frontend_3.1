# Informe Técnico de Despliegue y Ejecución del Sistema Fullstack

**Proyecto:** Sistema de Inventario y Tienda Web (UVM Shop)  
**Versión:** 2.0.0  
**Fecha de Elaboración:** Octubre 2026  
**Entorno de Ejecución:** Node.js (Backend) / React + Vite (Frontend) / MongoDB Atlas (Base de Datos)

---

## 1. Arquitectura y Stack Tecnológico

El proyecto está diseñado bajo una arquitectura desacoplada cliente-servidor (SPA - Single Page Application y API RESTful):

```mermaid
flowchart LR
    subgraph Cliente["Frontend (React 19 + Vite + Redux)"]
        UI["Interfaz UI (Bootstrap / Tailwind)"]
        Store["Redux Toolkit (5 Slices)"]
        Hooks["5 Custom Hooks"]
        AxiosClient["Cliente Axios (api.js)"]
        UI --> Hooks
        Hooks --> Store
        Store --> AxiosClient
    end

    subgraph Servidor["Backend (Node.js + Express)"]
        Router["Enrutador Express (/api)"]
        AuthMiddleware["Middleware JWT (proteger, soloAdmin)"]
        Controllers["Controladores (CRUD)"]
        MongooseModels["Modelos Mongoose (4 Entidades)"]
        Router --> AuthMiddleware --> Controllers --> MongooseModels
    end

    subgraph BaseDatos["Capa de Persistencia"]
        Atlas["MongoDB Atlas Cluster (Cloud)"]
    end

    AxiosClient -- "HTTP / REST (Puerto 5000)" --> Router
    MongooseModels -- "Mongoose Driver (TLS/SSL)" --> Atlas
```

### Componentes de Software:
* **Backend:**
  * **Runtime:** Node.js (v18.0.0 o superior, probado en v26.x).
  * **Framework Web:** Express 5.
  * **ORM/ODM:** Mongoose 9.
  * **Seguridad y Criptografía:** JSON Web Tokens (`jsonwebtoken`) y `bcryptjs`.
  * **Validación de Entradas:** `express-validator`.
  * **Gestión de Entorno:** `dotenv`.
  * **Cross-Origin Resource Sharing:** `cors`.
* **Frontend:**
  * **Framework / Librería:** React 19.
  * **Empaquetador y Servidor de Desarrollo:** Vite 8.
  * **Gestor de Estado Global:** Redux Toolkit (`@reduxjs/toolkit` y `react-redux`).
  * **Peticiones HTTP:** Axios con interceptores automáticos.
  * **Diseño y Estilos:** React-Bootstrap 2, Bootstrap 5 y Tailwind CSS 4.
* **Base de Datos:**
  * **Motor:** MongoDB Atlas (MongoDB en la nube).

---

## 2. Requisitos Previos e Instalación de Software

Antes de iniciar la ejecución, la máquina host (desarrollador o servidor) debe contar con:

1. **Node.js**:
   * Descargar la versión LTS desde [nodejs.org](https://nodejs.org/).
   * Verificar en terminal ejecutando:
     ```bash
     node -v
     npm -v
     ```
2. **Navegador Web Moderno**:
   * Google Chrome, Microsoft Edge, Mozilla Firefox o Safari.
3. **Conexión a Internet**:
   * Necesaria para la resolución de paquetes de `npm` y la conexión al cluster de MongoDB Atlas.

> [!NOTE]
> No es necesario instalar MongoDB de forma local en la máquina, ya que el sistema utiliza un cluster en la nube (**MongoDB Atlas**).

---

## 3. Estructura de Carpetas

El ecosistema está organizado en dos repositorios/carpetas independientes:

```
📁 Downloads/
├── 📁 Front-unidad-2.1-el-backend-main/           # BACKEND
│   ├── 📁 controladores/                         # Controladores CRUD (admin, auth, producto, categoria, usuario, favoritos)
│   ├── 📁 middlewares/                           # Middleware de autenticación y roles JWT
│   ├── 📁 modelos/                               # Esquemas Mongoose (Producto, Categoria, Usuario, Favoritos)
│   ├── 📁 rutas/                                 # Definición de endpoints REST
│   ├── 📄 config.env                             # Variables de entorno
│   ├── 📄 package.json                           # Dependencias y scripts del backend
│   └── 📄 servidor.js                            # Punto de entrada principal
│
└── 📁 Front-unidad-2.1-front-main/
    └── 📁 Front-unidad-2.1-front-main/           # FRONTEND
        ├── 📁 src/
        │   ├── 📁 componentes/                   # Tablas, modales, formularios, navbar, sidebar
        │   ├── 📁 hooks/                         # 5 Custom Hooks (useAuth, useProductos, useFavoritos, useUI, useForm)
        │   ├── 📁 servicios/                     # api.js con configuración base e interceptores Axios
        │   ├── 📁 store/                         # Redux Store y Slices (auth, productos, favoritos, categorias, ui)
        │   ├── 📁 views/                         # 8 Secciones del sistema (Inicio, Tienda, Categorías, Favoritos, etc.)
        │   ├── 📄 App.jsx                        # Componente raíz con enrutamiento de estado SPA
        │   └── 📄 main.jsx                       # Provider de Redux y montaje en DOM
        └── 📄 package.json                       # Dependencias y scripts de Vite
```

---

## 4. Configuración de Variables de Entorno

### Archivo `config.env` (Backend)
Ubicación: `Front-unidad-2.1-el-backend-main/config.env`

Debe contener los siguientes parámetros:

```env
# Puerto del servidor backend
PORT=5000

# Cadena de conexión a MongoDB Atlas
MONGO_URI=mongodb+srv://robertagf907_db_user:4SApIBhOvzpTeIBD@cluster0.tzxceqf.mongodb.net/BD?retryWrites=true&w=majority

# Credenciales iniciales para creación automática del Superadministrador
ADMIN_USERNAME=admin
ADMIN_NOMBRE=Admin
ADMIN_EMAIL=admin@invsis.com
ADMIN_PASSWORD=admin
ADMIN_ROL=admin

# Clave secreta y vigencia para la firma de tokens JWT
JWT_SECRET=uvmpanas1337_secret_key_development
JWT_EXPIRE=24h
```

> [!IMPORTANT]
> **Configuración en MongoDB Atlas (Network Access):**  
> Para que el cluster de Atlas acepte peticiones desde tu conexión IP, asegúrate en el panel de **MongoDB Atlas > Network Access** de tener habilitada la IP `0.0.0.0/0` (Allow Access from Anywhere) o tu IP pública actual.

---

## 5. Procedimiento de Ejecución Local

Para poner en marcha la solución completa se deben abrir **dos terminales**:

### Terminal 1: Puesta en marcha del Backend

1. Navegar al directorio del backend:
   ```bash
   cd C:\Users\khyso\Downloads\Front-unidad-2.1-el-backend-main
   ```
2. Instalar dependencias (solo si es la primera vez o si se agregaron paquetes):
   ```bash
   npm install
   ```
3. Iniciar el servidor en modo desarrollo:
   ```bash
   npm run dev
   ```
   *(Si no se tiene nodemon global, se puede ejecutar alternativamente `npm start`)*.

4. **Salida esperada en consola:**
   ```text
   Conectado a MongoDB Atlas correctamente
   Cuenta de administrador creada (o "El administrador ya existe")
   Servidor corriendo en http://localhost:5000
   ```

5. **Prueba de salud rápida:**  
   Puedes abrir en el navegador `http://localhost:5000/api/health`. Debe responder:
   ```json
   {
     "ok": true,
     "message": "API funcionando correctamente",
     "timestamp": "..."
   }
   ```

---

### Terminal 2: Puesta en marcha del Frontend

1. Navegar al directorio del frontend:
   ```bash
   cd C:\Users\khyso\Downloads\Front-unidad-2.1-front-main\Front-unidad-2.1-front-main
   ```
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Iniciar el servidor de desarrollo Vite:
   ```bash
   npm run dev
   ```
4. **Salida esperada en consola:**
   ```text
     VITE v8.3.4  ready in 250 ms

     ➜  Local:   http://localhost:5173/
     ➜  Network: use --host to expose
   ```
5. Abrir el navegador en: `http://localhost:5173/`

---

## 6. Verificación de Funcionamiento y Credenciales

Una vez levantados ambos servicios:

### Acceso con Perfil de Administrador:
* Haz clic en **"Iniciar sesión"** en la barra superior.
* **Email:** `admin@invsis.com`
* **Contraseña:** `admin`
* **Permisos habilitados:**
  * Crear, editar y eliminar cualquier producto en el catálogo.
  * Acceder a la sección **"Usuarios (Admin)"** para consultar la tabla de usuarios registrados, editar sus datos o eliminarlos.
  * Crear, editar y eliminar categorías en la sección **"Categorías (CRUD)"**.

### Registro de Usuario Común:
* Haz clic en **"Registrarse"** para crear un usuario cliente/vendedor.
* Permite crear productos propios, marcarlos como favoritos y ver el historial en **"Mis Favoritos"**.

---

## 7. Guía de Despliegue en la Nube (Producción)

Si se desea alojar el proyecto en servidores de producción accesibles vía internet público:

### Despliegue del Backend (p. ej., Render o Railway):
1. Subir la carpeta del backend a un repositorio de GitHub.
2. Crear un nuevo **Web Service** en [render.com](https://render.com/) o [railway.app](https://railway.app/).
3. Configurar:
   * **Build Command:** `npm install`
   * **Start Command:** `node servidor.js`
   * **Environment Variables:** Copiar las variables contenidas en `config.env` (`MONGO_URI`, `PORT=5000`, `JWT_SECRET`, etc.).
4. Obtener la URL pública del backend (ej: `https://mi-backend.onrender.com`).

### Despliegue del Frontend (p. ej., Vercel o Netlify):
1. En `src/servicios/api.js`, configurar la URL para producción o mediante variable de entorno `import.meta.env.VITE_API_URL || "https://mi-backend.onrender.com/api"`.
2. Generar el build local para verificación:
   ```bash
   npm run build
   ```
3. Conectar el repositorio de GitHub en [vercel.com](https://vercel.com/) o [netlify.com](https://netlify.com/).
4. Configurar el directorio raíz del frontend (`Front-unidad-2.1-front-main/Front-unidad-2.1-front-main`), build command `npm run build` y output directory `dist`.

---

## 8. Diagnóstico de Incidencias Frecuentes (Troubleshooting)

| Síntoma / Error | Causa Probable | Solución Técnica |
|---|---|---|
| `No se pudo conectar a MongoDB Atlas: querySrv ENOTFOUND` | No hay conexión a internet o el dominio de cluster es inaccesible. | Verificar conexión a internet y asegurarse de que el string en `config.env` no contenga saltos de línea. |
| `MongoServerSelectionError: connection timed out` | La IP actual de la máquina no está en la lista blanca de Atlas. | Entrar a MongoDB Atlas > **Network Access** > Agregar `0.0.0.0/0`. |
| `Error: listen EADDRINUSE: address already in use :::5000` | El puerto 5000 está ocupado por otra instancia previa de Node. | Terminar el proceso anterior con: `Get-Process node \| Stop-Process` en PowerShell. |
| `Network Error` en el frontend al hacer login o registrar | El backend no está corriendo en el puerto 5000. | Verificar que la Terminal 1 del backend siga activa y mostrando `Servidor corriendo en http://localhost:5000`. |

