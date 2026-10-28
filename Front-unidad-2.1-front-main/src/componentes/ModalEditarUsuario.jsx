// src/componentes/ModalEditarUsuario.jsx
import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import { useForm } from "../hooks";
import api from "../servicios/api";

const datosIniciales = {
  nombreUsuario: "",
  email: "",
  nombreCompleto: "",
  direccion: "",
  telefono: "",
  nuevaContraseña: "",
  confirmarContraseña: "",
};

const ModalEditarUsuario = ({
  mostrar,
  cerrarModal,
  usuarioId,
  actualizarUsuarios,
}) => {
  const { valores, manejarCambio, resetear, establecerValores } =
    useForm(datosIniciales);
  const [error, setError] = useState(null);
  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    if (usuarioId && mostrar) {
      const obtenerDatosUsuario = async () => {
        try {
          const { data } = await api.get(`/usuarios/${usuarioId}`);
          establecerValores({
            nombreUsuario: data.nombreUsuario || "",
            email: data.email || "",
            nombreCompleto: data.nombreCompleto || "",
            direccion: data.direccion || "",
            telefono: data.telefono || "",
            nuevaContraseña: "",
            confirmarContraseña: "",
          });
        } catch (err) {
          console.error("Error al obtener datos del usuario", err);
          setError("No se pudieron cargar los datos del usuario");
        }
      };
      obtenerDatosUsuario();
    }
  }, [usuarioId, mostrar]);

  const manejarSubmit = async (e) => {
    e.preventDefault();
    if (
      valores.nuevaContraseña &&
      valores.nuevaContraseña !== valores.confirmarContraseña
    ) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      await api.put(`/usuarios/${usuarioId}`, valores);
      setMensaje("Usuario actualizado correctamente");
      setError(null);
      if (actualizarUsuarios) {
        actualizarUsuarios();
      }
      setTimeout(() => {
        cerrarModalYResetear();
      }, 900);
    } catch (err) {
      console.error("Error al actualizar usuario", err);
      setError(err.response?.data?.mensaje || "Error al actualizar el usuario");
    }
  };

  const cerrarModalYResetear = () => {
    resetear();
    setMensaje(null);
    setError(null);
    cerrarModal();
  };

  return (
    <Modal show={mostrar} onHide={cerrarModalYResetear}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {mensaje && <Alert variant="success">{mensaje}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={manejarSubmit}>
          <Form.Group controlId="nombreUsuario" className="mb-3">
            <Form.Label>Nombre de Usuario</Form.Label>
            <Form.Control
              type="text"
              name="nombreUsuario"
              value={valores.nombreUsuario}
              onChange={manejarCambio}
              required
            />
          </Form.Group>
          <Form.Group controlId="email" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={valores.email}
              onChange={manejarCambio}
              required
            />
          </Form.Group>
          <Form.Group controlId="nombreCompleto" className="mb-3">
            <Form.Label>Nombre Completo</Form.Label>
            <Form.Control
              type="text"
              name="nombreCompleto"
              value={valores.nombreCompleto}
              onChange={manejarCambio}
              required
            />
          </Form.Group>
          <Form.Group controlId="direccion" className="mb-3">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              name="direccion"
              value={valores.direccion}
              onChange={manejarCambio}
            />
          </Form.Group>
          <Form.Group controlId="telefono" className="mb-3">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              name="telefono"
              value={valores.telefono}
              onChange={manejarCambio}
            />
          </Form.Group>
          <Form.Group controlId="nuevaContraseña" className="mb-3">
            <Form.Label>Nueva Contraseña (opcional)</Form.Label>
            <Form.Control
              type="password"
              name="nuevaContraseña"
              placeholder="Dejar en blanco para no cambiar"
              value={valores.nuevaContraseña}
              onChange={manejarCambio}
            />
          </Form.Group>
          <Form.Group controlId="confirmarContraseña" className="mb-3">
            <Form.Label>Confirmar Nueva Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="confirmarContraseña"
              placeholder="Confirmar contraseña"
              value={valores.confirmarContraseña}
              onChange={manejarCambio}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100 mt-2">
            Guardar Cambios
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalEditarUsuario;
