// src/componentes/ModalLogin.jsx
import React from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import { useForm } from "../hooks";

const ModalLogin = ({
  mostrar,
  cerrarModal,
  manejarSubmitLogin,
  errorLogin,
}) => {
  const { valores, manejarCambio, resetear } = useForm({
    email: "",
    contraseña: "",
  });

  const manejarSubmit = async (e) => {
    e.preventDefault();
    await manejarSubmitLogin(valores.email, valores.contraseña);
  };

  const manejarCerrar = () => {
    resetear();
    cerrarModal();
  };

  return (
    <Modal show={mostrar} onHide={manejarCerrar}>
      <Modal.Header closeButton>
        <Modal.Title>Iniciar Sesión</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorLogin && <Alert variant="danger">{errorLogin}</Alert>}
        <Form onSubmit={manejarSubmit}>
          <Form.Group controlId="loginEmail" className="mb-3">
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
          <Form.Group controlId="loginPassword" className="mb-3">
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
          <Button type="submit" variant="primary" className="w-100 mt-2">
            Iniciar Sesión
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalLogin;
