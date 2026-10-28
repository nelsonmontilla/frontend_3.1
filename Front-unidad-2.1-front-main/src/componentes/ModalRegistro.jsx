// src/componentes/ModalRegistro.jsx
import React from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import { useForm } from "../hooks";

const ModalRegistro = ({
  mostrar,
  cerrarModal,
  manejarSubmitRegistro,
  errorRegistro,
}) => {
  const { valores, manejarCambio, resetear } = useForm({
    nombreUsuario: "",
    nombreCompleto: "",
    email: "",
    contraseña: "",
    confirmarContraseña: "",
  });

  const manejarEnvio = async (e) => {
    e.preventDefault();
    await manejarSubmitRegistro(valores);
  };

  const manejarCerrar = () => {
    resetear();
    cerrarModal();
  };

  return (
    <Modal show={mostrar} onHide={manejarCerrar}>
      <Modal.Header closeButton>
        <Modal.Title>Registrarse</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorRegistro && <Alert variant="danger">{errorRegistro}</Alert>}
        <Form onSubmit={manejarEnvio}>
          <Form.Group controlId="registroNombreUsuario" className="mb-3">
            <Form.Label>Nombre de Usuario</Form.Label>
            <Form.Control
              type="text"
              name="nombreUsuario"
              value={valores.nombreUsuario}
              onChange={manejarCambio}
              placeholder="Ingresa tu nombre de usuario"
              required
            />
          </Form.Group>
          <Form.Group controlId="registroNombreCompleto" className="mb-3">
            <Form.Label>Nombre Completo</Form.Label>
            <Form.Control
              type="text"
              name="nombreCompleto"
              value={valores.nombreCompleto}
              onChange={manejarCambio}
              placeholder="Ingresa tu nombre completo"
              required
            />
          </Form.Group>
          <Form.Group controlId="registroEmail" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={valores.email}
              onChange={manejarCambio}
              placeholder="Ingresa tu email"
              required
            />
          </Form.Group>
          <Form.Group controlId="registroContraseña" className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="contraseña"
              value={valores.contraseña}
              onChange={manejarCambio}
              placeholder="Ingresa tu contraseña"
              required
            />
          </Form.Group>
          <Form.Group controlId="registroConfirmarContraseña" className="mb-3">
            <Form.Label>Confirmar Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="confirmarContraseña"
              value={valores.confirmarContraseña}
              onChange={manejarCambio}
              placeholder="Confirma tu contraseña"
              required
            />
          </Form.Group>
          <Button type="submit" variant="primary" className="w-100 mt-2">
            Registrarse
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalRegistro;
