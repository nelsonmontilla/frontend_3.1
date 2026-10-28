// src/App.jsx
import React from "react";
import { useAuth, useUI } from "./hooks";
import { AuthProvider } from "./context/AuthContext";
import NavbarApp from "./componentes/NavbarApp";
import SidebarApp from "./componentes/SidebarApp";
import ModalLogin from "./componentes/ModalLogin";
import ModalRegistro from "./componentes/ModalRegistro";

// Vistas del sistema (8 secciones relevantes)
import InicioView from "./views/InicioView";
import TiendaView from "./views/TiendaView";
import CategoriasView from "./views/CategoriasView";
import FavoritosView from "./views/FavoritosView";
import NosotrosView from "./views/NosotrosView";
import FaqView from "./views/FaqView";
import ContactoView from "./views/ContactoView";
import UsuariosView from "./views/UsuariosView";

function AppContent() {
  const {
    usuarioAutenticado,
    errorLogin,
    errorRegistro,
    login,
    registrar,
    logout,
    limpiarErrores,
  } = useAuth();
  const { vistaActual, modales, cambiarVista, abrirModal, cerrarModal } = useUI();

  const manejarSubmitLogin = async (email, contraseña) => {
    const mensajeError = await login(email, contraseña);
    if (!mensajeError) {
      cerrarModal("login");
      limpiarErrores();
    }
  };

  const manejarSubmitRegistro = async (datos) => {
    const mensajeError = await registrar(datos);
    if (!mensajeError) {
      cerrarModal("registro");
      limpiarErrores();
    }
  };

  const renderVista = () => {
    switch (vistaActual) {
      case "inicio":
        return <InicioView cambiarVista={cambiarVista} />;
      case "tienda":
        return <TiendaView cambiarVista={cambiarVista} />;
      case "categorias":
        return <CategoriasView cambiarVista={cambiarVista} />;
      case "favoritos":
        return <FavoritosView cambiarVista={cambiarVista} />;
      case "nosotros":
        return <NosotrosView cambiarVista={cambiarVista} />;
      case "faq":
        return <FaqView cambiarVista={cambiarVista} />;
      case "contacto":
        return <ContactoView cambiarVista={cambiarVista} />;
      case "usuarios":
        return <UsuariosView cambiarVista={cambiarVista} />;
      default:
        return <InicioView cambiarVista={cambiarVista} />;
    }
  };

  return (
    <>
      <NavbarApp
        usuarioAutenticado={usuarioAutenticado}
        cerrarSesion={logout}
        abrirModalLogin={() => abrirModal("login")}
        abrirModalRegistro={() => abrirModal("registro")}
        cambiarVista={cambiarVista}
        vistaActual={vistaActual}
      />

      <div className="d-flex" style={{ minHeight: "calc(100vh - 72px)" }}>
        <SidebarApp vistaActual={vistaActual} cambiarVista={cambiarVista} />
        <main className="flex-grow-1 overflow-auto" style={{ background: "#f8fafc" }}>
          {renderVista()}
        </main>
      </div>

      <ModalLogin
        mostrar={modales.login}
        cerrarModal={() => {
          cerrarModal("login");
          limpiarErrores();
        }}
        manejarSubmitLogin={manejarSubmitLogin}
        errorLogin={errorLogin}
      />

      <ModalRegistro
        mostrar={modales.registro}
        cerrarModal={() => {
          cerrarModal("registro");
          limpiarErrores();
        }}
        manejarSubmitRegistro={manejarSubmitRegistro}
        errorRegistro={errorRegistro}
      />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
