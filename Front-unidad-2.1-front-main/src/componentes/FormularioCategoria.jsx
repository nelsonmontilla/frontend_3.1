// src/componentes/FormularioCategoria.jsx
import React, { useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useForm, useCategorias } from "../hooks";

const FormularioCategoria = ({
  mostrar,
  cerrarModal,
  categoriaSeleccionada,
  actualizarCategorias,
}) => {
  const { valores, manejarCambio, resetear, establecerValores } = useForm({
    nombre: "",
    descripcion: "",
    icono: "tag",
  });
  const { crearCategoria, actualizarCategoria } = useCategorias();

  useEffect(() => {
    if (categoriaSeleccionada) {
      establecerValores({
        nombre: categoriaSeleccionada.nombre || "",
        descripcion: categoriaSeleccionada.descripcion || "",
        icono: categoriaSeleccionada.icono || "tag",
      });
    } else {
      resetear();
    }
  }, [categoriaSeleccionada]);

  const manejarEnvio = async (e) => {
    e.preventDefault();
    try {
      if (categoriaSeleccionada) {
        await actualizarCategoria(categoriaSeleccionada._id, valores);
      } else {
        await crearCategoria(valores);
      }
      if (actualizarCategorias) {
        actualizarCategorias();
      }
      resetear();
      cerrarModal();
    } catch (error) {
      console.error("Error al guardar la categoría:", error);
    }
  };

  return (
    <Modal show={mostrar} onHide={cerrarModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          {categoriaSeleccionada ? "Editar Categoría" : "Nueva Categoría"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={manejarEnvio}>
          <Form.Group controlId="nombreCategoria" className="mb-3">
            <Form.Label>Nombre de la Categoría</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={valores.nombre}
              onChange={manejarCambio}
              placeholder="Ej: Calzado, Muebles..."
              required
            />
          </Form.Group>

          <Form.Group controlId="descripcionCategoria" className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="descripcion"
              value={valores.descripcion}
              onChange={manejarCambio}
              placeholder="Breve descripción de la categoría"
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mt-2">
            {categoriaSeleccionada ? "Guardar Cambios" : "Crear Categoría"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default FormularioCategoria;

