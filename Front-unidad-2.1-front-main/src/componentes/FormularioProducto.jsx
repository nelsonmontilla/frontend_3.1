// src/componentes/FormularioProducto.jsx
import React, { useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { useForm, useProductos } from "../hooks";

const valoresInicialesDefecto = {
  nombre: "",
  categoria: "ropa",
  descripcion: "",
  precio: 0,
  cantidad: 0,
  imagen: "",
};

const FormularioProducto = ({
  mostrar,
  cerrarModal,
  productoSeleccionado,
  obtenerProductos,
}) => {
  const { valores, manejarCambio, resetear, establecerValores } =
    useForm(valoresInicialesDefecto);
  const { crearProducto, actualizarProducto } = useProductos();

  useEffect(() => {
    if (productoSeleccionado) {
      establecerValores({
        nombre: productoSeleccionado.nombre || "",
        categoria: productoSeleccionado.categoria || "ropa",
        descripcion: productoSeleccionado.descripcion || "",
        precio: productoSeleccionado.precio || 0,
        cantidad: productoSeleccionado.cantidad || 0,
        imagen: productoSeleccionado.imagen || "",
      });
    } else {
      resetear();
    }
  }, [productoSeleccionado]);

  const manejarEnvio = async (e) => {
    e.preventDefault();

    try {
      if (productoSeleccionado) {
        await actualizarProducto(productoSeleccionado._id, valores);
      } else {
        await crearProducto(valores);
      }

      if (obtenerProductos) {
        obtenerProductos();
      }

      resetear();
      cerrarModal();
    } catch (error) {
      console.error("Error al enviar el formulario", error);
    }
  };

  return (
    <Modal show={mostrar} onHide={cerrarModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          {productoSeleccionado ? "Editar Producto" : "Agregar Producto"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={manejarEnvio}>
          <Form.Group controlId="nombre" className="mb-3">
            <Form.Label>Nombre del Producto</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={valores.nombre}
              onChange={manejarCambio}
              required
            />
          </Form.Group>

          <Form.Group controlId="categoria" className="mb-3">
            <Form.Label>Categoría</Form.Label>
            <Form.Select
              name="categoria"
              value={valores.categoria}
              onChange={manejarCambio}
            >
              <option value="ropa">Ropa</option>
              <option value="electronica">Electrónica / Tecnología</option>
              <option value="hogar">Hogar</option>
              <option value="libros">Libros</option>
              <option value="deportes">Deportes</option>
              <option value="comida">Comida</option>
              <option value="otros">Otros</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="descripcion" className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="text"
              name="descripcion"
              value={valores.descripcion}
              onChange={manejarCambio}
            />
          </Form.Group>

          <Form.Group controlId="precio" className="mb-3">
            <Form.Label>Precio (USD)</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              name="precio"
              value={valores.precio}
              onChange={manejarCambio}
              required
            />
          </Form.Group>

          <Form.Group controlId="cantidad" className="mb-3">
            <Form.Label>Cantidad en inventario</Form.Label>
            <Form.Control
              type="number"
              name="cantidad"
              value={valores.cantidad}
              onChange={manejarCambio}
              required
            />
          </Form.Group>

          <Form.Group controlId="imagen" className="mb-3">
            <Form.Label>URL de la Imagen</Form.Label>
            <Form.Control
              type="text"
              name="imagen"
              value={valores.imagen}
              onChange={manejarCambio}
              placeholder="https://..."
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mt-2">
            {productoSeleccionado ? "Actualizar Producto" : "Crear Producto"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default FormularioProducto;
