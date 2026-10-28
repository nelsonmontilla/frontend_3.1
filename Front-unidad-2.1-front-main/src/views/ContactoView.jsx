import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useForm } from "../hooks";

function ContactoView() {
  const { valores, manejarCambio, resetear } = useForm({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
  });

  const [enviado, setEnviado] = useState(false);

  useEffect(() => {
    document.title = "Contacto | UVM Shop";
  }, []);

  const manejarEnvio = (e) => {
    e.preventDefault();
    setEnviado(true);
    resetear();
    setTimeout(() => setEnviado(false), 5000);
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center g-4">
        <Col lg={5}>
          <Card className="shadow-sm border-0 h-100 rounded-4 bg-primary text-white p-4">
            <Card.Body className="d-flex flex-column justify-content-between">
              <div>
                <h3 className="fw-bold mb-3">Información de Contacto</h3>
                <p className="opacity-90">
                  Estamos atentos para responder tus dudas sobre el inventario, tus compras o el
                  soporte del sistema.
                </p>
                <div className="mt-4 space-y-3">
                  <p className="mb-2"><strong>📧 Email:</strong> robertagf907@gmail.com</p>
                  <p className="mb-2"><strong>📞 Teléfono:</strong> 0424-7210667</p>
                  <p className="mb-2"><strong>📍 Ubicación:</strong> Valera, Trujillo, Venezuela</p>
                  <p className="mb-0"><strong>⏰ Horario:</strong> Lunes a Sábado, 9:00 - 18:00</p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-top border-white-50 small opacity-75">
                UVM - Proyecto Front End II & Back End Moderno
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={7}>
          <Card className="shadow-sm border-0 rounded-4 p-4">
            <Card.Body>
              <h3 className="fw-bold text-slate-800 mb-2">Envíanos un Mensaje</h3>
              <p className="text-muted small mb-4">
                Formulario interactivo controlado con el custom hook <code>useForm</code>.
              </p>

              {enviado && (
                <Alert variant="success" dismissible onClose={() => setEnviado(false)}>
                  ¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.
                </Alert>
              )}

              <Form onSubmit={manejarEnvio}>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group controlId="contactoNombre">
                      <Form.Label>Nombre Completo</Form.Label>
                      <Form.Control
                        type="text"
                        name="nombre"
                        value={valores.nombre}
                        onChange={manejarCambio}
                        placeholder="Tu nombre"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="contactoEmail">
                      <Form.Label>Correo Electrónico</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={valores.email}
                        onChange={manejarCambio}
                        placeholder="correo@ejemplo.com"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12}>
                    <Form.Group controlId="contactoAsunto">
                      <Form.Label>Asunto</Form.Label>
                      <Form.Control
                        type="text"
                        name="asunto"
                        value={valores.asunto}
                        onChange={manejarCambio}
                        placeholder="Motivo de tu consulta"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12}>
                    <Form.Group controlId="contactoMensaje">
                      <Form.Label>Mensaje</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        name="mensaje"
                        value={valores.mensaje}
                        onChange={manejarCambio}
                        placeholder="Escribe tu mensaje detallado aquí..."
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12}>
                    <Button type="submit" variant="primary" className="px-4 py-2 w-100">
                      Enviar Mensaje
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ContactoView;
