// src/componentes/SidebarApp.jsx
import React from "react";
import { Nav } from "react-bootstrap";
import { useAuth } from "../hooks";

function SidebarApp({ vistaActual, cambiarVista }) {
  const { rolUsuario } = useAuth();

  const menuItems = [
    { id: "inicio", label: "Inicio (Landing)", icon: "🏠" },
    { id: "tienda", label: "Tienda y Productos", icon: "🛒" },
    { id: "categorias", label: "Categorías (CRUD)", icon: "🏷️" },
    { id: "favoritos", label: "Mis Favoritos", icon: "⭐" },
    { id: "nosotros", label: "Sobre Nosotros", icon: "ℹ️" },
    { id: "faq", label: "Preguntas Frecuentes", icon: "❓" },
    { id: "contacto", label: "Contacto y Soporte", icon: "📩" },
  ];

  if (rolUsuario === "admin") {
    menuItems.push({ id: "usuarios", label: "Usuarios (Admin)", icon: "👥" });
  }

  return (
    <aside
      className="d-none d-md-block"
      style={{
        width: "250px",
        minWidth: "250px",
        minHeight: "calc(100vh - 72px)",
        background: "#ffffff",
        borderRight: "1px solid #e2e8f0",
        padding: "1.5rem 1rem",
      }}
    >
      <div className="fw-bold text-slate-800 mb-3 px-3 text-uppercase small tracking-wider text-muted">
        Navegación
      </div>

      <Nav className="flex-column gap-1">
        {menuItems.map((item) => {
          const activo = vistaActual === item.id;
          return (
            <Nav.Link
              key={item.id}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                cambiarVista(item.id);
              }}
              className={
                "px-3 py-2 rounded-3 text-decoration-none d-flex align-items-center gap-2 " +
                (activo
                  ? "bg-primary text-white fw-semibold shadow-sm"
                  : "text-slate-700 hover:bg-slate-100")
              }
              style={{
                transition: "all 0.15s ease-in-out",
                fontSize: "0.95rem",
              }}
            >
              <span style={{ fontSize: "1.1rem" }}>{item.icon}</span>
              <span>{item.label}</span>
            </Nav.Link>
          );
        })}
      </Nav>
    </aside>
  );
}

export default SidebarApp;
