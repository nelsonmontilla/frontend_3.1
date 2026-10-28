// src/views/NosotrosView.jsx
import React, { useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

function NosotrosView({ cambiarVista }) {
  useEffect(() => {
    document.title = "Sobre Nosotros | UVM Shop";
  }, []);

  return (
    <Container className="py-5">
      <Card className="shadow-sm border-0 rounded-4 overflow-hidden mb-5 bg-gradient-to-r from-blue-50 to-indigo-50">
        <Card.Body className="p-5 text-center">
          <span className="badge bg-primary px-3 py-2 text-uppercase mb-3">
            Nuestra Historia
          </span>
          <h1 className="fw-bold text-slate-800 mb-3">Sobre UVM Shop</h1>
          <p className="text-muted mx-auto lead" style={{ maxWidth: 750 }}>
            Somos una plataforma moderna de inventario y comercio electrónico desarrollada
            para brindar una experiencia ágil, confiable y segura a compradores y vendedores.
          </p>
        </Card.Body>
      </Card>

      <Row className="g-4 mb-5">
        <Col md={4}>
          <Card className="h-100 shadow-sm border-0 rounded-4 p-3">
            <Card.Body>
              <div className="fs-1 text-primary mb-3">🎯</div>
              <h4 className="fw-bold mb-2">Misión</h4>
              <p className="text-muted">
                Facilitar la gestión de inventario y la venta en línea a través de herramientas
                tecnológicas de vanguardia, accesibles y fáciles de usar para cualquier usuario.
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 shadow-sm border-0 rounded-4 p-3">
            <Card.Body>
              <div className="fs-1 text-success mb-3">🚀</div>
              <h4 className="fw-bold mb-2">Visión</h4>
              <p className="text-muted">
                Consolidarnos como el sistema de gestión de catálogo de referencia dentro del
                ámbito académico y comercial, destacando por rendimiento y escalabilidad.
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 shadow-sm border-0 rounded-4 p-3">
            <Card.Body>
              <div className="fs-1 text-warning mb-3">⭐</div>
              <h4 className="fw-bold mb-2">Valores</h4>
              <p className="text-muted">
                Transparencia, seguridad en cada transacción, soporte continuo y compromiso con la
                calidad del código y la arquitectura de software.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="shadow-sm border-0 rounded-4 p-4 text-center">
        <Card.Body>
          <h3 className="fw-bold mb-3">¿Listo para comenzar a publicar productos?</h3>
          <p className="text-muted mb-4">
            Crea tu cuenta hoy mismo o explora las categorías disponibles en nuestro catálogo.
          </p>
          <button
            className="btn btn-primary px-4 py-2 me-3"
            onClick={() => cambiarVista("tienda")}
          >
            Ir al Catálogo
          </button>
          <button
            className="btn btn-outline-secondary px-4 py-2"
            onClick={() => cambiarVista("contacto")}
          >
            Contáctanos
          </button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default NosotrosView;

