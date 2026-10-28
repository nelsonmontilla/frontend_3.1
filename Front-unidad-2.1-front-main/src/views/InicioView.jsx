// src/views/InicioView.jsx
import React, { useEffect } from "react";
import { Container, Button, Card, Row, Col, Badge } from "react-bootstrap";

function InicioView({ cambiarVista }) {
  useEffect(() => {
    document.title = "Inicio | UVM Shop";
  }, []);

  return (
    <Container className="py-5">
      {/* Hero Section */}
      <Card className="shadow-sm border-0 mb-5 rounded-4 overflow-hidden bg-gradient-to-r from-blue-50 via-white to-indigo-50">
        <Card.Body className="p-5 text-center">
          <Badge bg="primary" className="px-3 py-2 text-uppercase mb-3 tracking-wide">
            Plataforma Integral SPA
          </Badge>
          <h1 className="display-4 fw-bold mb-3 text-slate-800">
            Inventario y Tienda UVM
          </h1>
          <p className="text-muted mx-auto mb-4 lead" style={{ maxWidth: 760 }}>
            Sistema completo de comercio electrónico con CRUD de productos, categorías y usuarios,
            autenticación segura con JWT, estado global en Redux y arquitectura responsive.
          </p>

          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Button
              variant="primary"
              size="lg"
              onClick={() => cambiarVista("tienda")}
              className="px-4 py-2"
            >
              🛒 Explorar Catálogo
            </Button>
            <Button
              variant="outline-primary"
              size="lg"
              onClick={() => cambiarVista("categorias")}
              className="px-4 py-2"
            >
              🏷️ Ver Categorías
            </Button>
            <Button
              variant="outline-secondary"
              size="lg"
              onClick={() => cambiarVista("nosotros")}
              className="px-4 py-2"
            >
              ℹ️ Conoce Más
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Secciones de Características */}
      <h3 className="fw-bold text-center text-slate-800 mb-4">
        ¿Por qué utilizar UVM Shop?
      </h3>
      <Row className="g-4 mb-5">
        <Col md={4}>
          <Card className="h-100 shadow-sm border-0 rounded-4 p-3">
            <Card.Body>
              <div className="fs-1 text-primary mb-3">📦</div>
              <h4 className="fw-bold text-slate-800 mb-2">CRUD Completo</h4>
              <p className="text-muted mb-0">
                Gestiona productos, categorías y usuarios con formularios interactivos y tablas de datos avanzadas.
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 shadow-sm border-0 rounded-4 p-3">
            <Card.Body>
              <div className="fs-1 text-success mb-3">⚡</div>
              <h4 className="fw-bold text-slate-800 mb-2">Redux & Custom Hooks</h4>
              <p className="text-muted mb-0">
                Flujo reactivo controlado mediante Redux Toolkit y 5 custom hooks personalizados para máxima modularidad.
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 shadow-sm border-0 rounded-4 p-3">
            <Card.Body>
              <div className="fs-1 text-warning mb-3">⭐</div>
              <h4 className="fw-bold text-slate-800 mb-2">Lista de Favoritos</h4>
              <p className="text-muted mb-0">
                Guarda tus artículos preferidos en tu cuenta y consúltalos en una tabla dinámica en cualquier momento.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Atajos a las Secciones de la Plataforma */}
      <Card className="shadow-sm border-0 rounded-4 p-4 bg-light">
        <Card.Body>
          <h4 className="fw-bold mb-3 text-slate-800">Accesos Rápidos a las Secciones</h4>
          <Row className="g-3">
            <Col sm={6} md={3}>
              <Button
                variant="outline-dark"
                className="w-100 py-3 text-start d-flex align-items-center gap-2"
                onClick={() => cambiarVista("tienda")}
              >
                <span>🛒</span> <strong>Tienda y Productos</strong>
              </Button>
            </Col>
            <Col sm={6} md={3}>
              <Button
                variant="outline-dark"
                className="w-100 py-3 text-start d-flex align-items-center gap-2"
                onClick={() => cambiarVista("categorias")}
              >
                <span>🏷️</span> <strong>Gestión Categorías</strong>
              </Button>
            </Col>
            <Col sm={6} md={3}>
              <Button
                variant="outline-dark"
                className="w-100 py-3 text-start d-flex align-items-center gap-2"
                onClick={() => cambiarVista("faq")}
              >
                <span>❓</span> <strong>Preguntas Frecuentes</strong>
              </Button>
            </Col>
            <Col sm={6} md={3}>
              <Button
                variant="outline-dark"
                className="w-100 py-3 text-start d-flex align-items-center gap-2"
                onClick={() => cambiarVista("contacto")}
              >
                <span>📩</span> <strong>Contacto y Soporte</strong>
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default InicioView;
