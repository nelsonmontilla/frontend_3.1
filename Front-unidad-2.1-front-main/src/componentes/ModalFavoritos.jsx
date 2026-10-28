// src/componentes/ModalFavoritos.jsx
import React, { useEffect } from "react";
import { Modal, Table, Button, Alert } from "react-bootstrap";
import { useFavoritos } from "../hooks";

const ModalFavoritos = ({ mostrar, cerrarModal }) => {
  const { favoritos, cargarFavoritos, eliminarDeFavoritos, cargando } =
    useFavoritos();

  useEffect(() => {
    if (mostrar) {
      cargarFavoritos();
    }
  }, [mostrar]);

  const manejarEliminar = async (productoId) => {
    try {
      await eliminarDeFavoritos(productoId);
    } catch (error) {
      console.error("Error al eliminar de favoritos", error);
    }
  };

  return (
    <Modal show={mostrar} onHide={cerrarModal} size="lg" scrollable>
      <Modal.Header closeButton>
        <Modal.Title>Mis Productos Favoritos</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {favoritos && favoritos.length > 0 ? (
          <Table responsive striped bordered hover className="align-middle text-center">
            <thead className="table-primary">
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {favoritos.map((producto) => (
                <tr key={producto._id}>
                  <td>
                    <img
                      src={producto.imagen || "https://placehold.co/75x75?text=Item"}
                      alt={producto.nombre}
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  </td>
                  <td className="fw-semibold text-start">{producto.nombre}</td>
                  <td className="text-capitalize">{producto.categoria}</td>
                  <td className="fw-bold text-success">${producto.precio}</td>
                  <td>{producto.cantidad}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => manejarEliminar(producto._id)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Alert variant="info" className="mb-0 text-center">
            {cargando ? "Cargando tus favoritos..." : "No tienes productos en tu lista de favoritos actualmente."}
          </Alert>
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

export default ModalFavoritos;
