// src/componentes/ModalUsuarios.jsx
import React from "react";
import { Modal, Table, Button, Badge } from "react-bootstrap";
import api from "../servicios/api";

const ModalUsuarios = ({
  mostrar,
  cerrarModal,
  usuarios,
  abrirModalParaEditarUsuario,
  actualizarUsuarios,
}) => {
  const manejarEliminar = async (id, nombre) => {
    if (!window.confirm(`¿Seguro que deseas eliminar al usuario "${nombre}"?`)) {
      return;
    }
    try {
      await api.delete(`/usuarios/${id}`);
      if (actualizarUsuarios) {
        actualizarUsuarios();
      }
    } catch (error) {
      alert(error.response?.data?.mensaje || "Error al eliminar el usuario");
    }
  };

  return (
    <Modal show={mostrar} onHide={cerrarModal} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Gestión de Usuarios (Tabla de Entidad)</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {usuarios && usuarios.length > 0 ? (
          <Table responsive striped bordered hover className="align-middle text-center">
            <thead className="table-primary">
              <tr>
                <th>Usuario</th>
                <th>Email</th>
                <th>Nombre Completo</th>
                <th>Rol</th>
                <th>Acciones (CRUD)</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario._id}>
                  <td className="fw-semibold">{usuario.nombreUsuario}</td>
                  <td>{usuario.email}</td>
                  <td>{usuario.nombreCompleto}</td>
                  <td>
                    <Badge bg={usuario.rol === "admin" ? "danger" : "secondary"}>
                      {usuario.rol}
                    </Badge>
                  </td>
                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <Button
                        size="sm"
                        variant="warning"
                        onClick={() => abrirModalParaEditarUsuario(usuario)}
                      >
                        Editar
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => manejarEliminar(usuario._id, usuario.nombreUsuario)}
                      >
                        Eliminar
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p className="text-muted text-center my-3">No hay usuarios registrados.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={cerrarModal}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalUsuarios;
