// src/componentes/NavbarApp.jsx
import React from "react";
import { Navbar, Container, Nav, Button, ButtonGroup, Badge } from "react-bootstrap";

function NavbarApp({
  usuarioAutenticado,
  cerrarSesion,
  abrirModalLogin,
  abrirModalRegistro,
  cambiarVista,
  vistaActual,
}) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm sticky-top">
      <Container fluid className="px-4">
        <Navbar.Brand
          href="#"
          onClick={(e) => {
            e.preventDefault();
            if (cambiarVista) cambiarVista("inicio");
          }}
          className="text-white fw-bold d-flex align-items-center gap-2"
          style={{ cursor: "pointer" }}
        >
          <span style={{ fontSize: "1.4rem" }}>🛒</span>
          <span>UVM Shop</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav-responsive" />

        <Navbar.Collapse id="navbar-nav-responsive">
          {/* Navegación visible especialmente en dispositivos móviles */}
          <Nav className="me-auto d-md-none py-2 border-top border-secondary mt-2">
            <Nav.Link onClick={() => cambiarVista("inicio")} active={vistaActual === "inicio"}>
              🏠 Inicio (Landing)
            </Nav.Link>
            <Nav.Link onClick={() => cambiarVista("tienda")} active={vistaActual === "tienda"}>
              🛒 Tienda y Productos
            </Nav.Link>
            <Nav.Link onClick={() => cambiarVista("categorias")} active={vistaActual === "categorias"}>
              🏷️ Categorías (CRUD)
            </Nav.Link>
            <Nav.Link onClick={() => cambiarVista("favoritos")} active={vistaActual === "favoritos"}>
              ⭐ Mis Favoritos
            </Nav.Link>
            <Nav.Link onClick={() => cambiarVista("nosotros")} active={vistaActual === "nosotros"}>
              ℹ️ Sobre Nosotros
            </Nav.Link>
            <Nav.Link onClick={() => cambiarVista("faq")} active={vistaActual === "faq"}>
              ❓ Preguntas Frecuentes
            </Nav.Link>
            <Nav.Link onClick={() => cambiarVista("contacto")} active={vistaActual === "contacto"}>
              📩 Contacto y Soporte
            </Nav.Link>
          </Nav>

          <div className="ms-auto d-flex align-items-center gap-3">
            {usuarioAutenticado ? (
              <div className="d-flex align-items-center gap-3">
                <span className="text-white-50 small d-none d-sm-inline">
                  Hola, <strong className="text-white">{usuarioAutenticado.nombreUsuario || usuarioAutenticado.nombreCompleto}</strong>
                  {usuarioAutenticado.rol === "admin" && (
                    <Badge bg="danger" className="ms-2">Admin</Badge>
                  )}
                </span>
                <Button
                  variant="outline-light"
                  size="sm"
                  onClick={cerrarSesion}
                >
                  Cerrar sesión
                </Button>
              </div>
            ) : (
              <ButtonGroup size="sm">
                <Button variant="primary" onClick={abrirModalLogin} className="px-3">
                  Iniciar sesión
                </Button>
                <Button variant="outline-light" onClick={abrirModalRegistro} className="px-3">
                  Registrarse
                </Button>
              </ButtonGroup>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarApp;
