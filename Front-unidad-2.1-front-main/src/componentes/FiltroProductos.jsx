// src/componentes/FiltroProductos.jsx
import React from "react";
import { Form } from "react-bootstrap";

const FiltroProductos = ({
  busqueda,
  manejarCambioBusqueda,
  categoria,
  manejarCambioCategoria,
}) => {
  return (
    <>
      <Form.Control
        type="text"
        placeholder="Buscar por nombre, descripción o categoría"
        value={busqueda}
        onChange={manejarCambioBusqueda}
        className="mb-4"
      />
      <Form.Select
        value={categoria}
        onChange={manejarCambioCategoria}
        className="mb-4"
      >
        <option value="">Todas las Categorías</option>
        <option value="ropa">Ropa</option>
        <option value="tecnologia">Tecnología</option>
        <option value="comida">Comida</option>
        <option value="otros">Otros</option>
      </Form.Select>
    </>
  );
};

export default FiltroProductos;
