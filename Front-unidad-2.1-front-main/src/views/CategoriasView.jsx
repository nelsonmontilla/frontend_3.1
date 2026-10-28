// src/views/CategoriasView.jsx
import React, { useEffect, useState } from "react";
import { Container, Table, Button, Badge, Card, Alert } from "react-bootstrap";
import { useCategorias, useAuth } from "../hooks";
import FormularioCategoria from "../componentes/FormularioCategoria";

function CategoriasView() {
  const {
    categorias,
    cargando,
    error,
    cargarCategorias,
    eliminarCategoria,
  } = useCategorias();
  const { usuarioAutenticado } = useAuth();

  const [mostrarModal, setMostrarModal] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  useEffect(() => {
    document.title = "Categorías | UVM Shop";
    cargarCategorias();
  }, []);

  const abrirCrear = () => {
    setCategoriaSeleccionada(null);
    setMostrarModal(true);
  };

  const abrirEditar = (cat) => {
    setCategoriaSeleccionada(cat);
    setMostrarModal(true);
  };

  const manejarEliminar = async (id, nombre) => {
    if (window.confirm(`¿Seguro que deseas eliminar la categoría "${nombre}"?`)) {
      try {
        await eliminarCategoria(id);
      } catch (err) {
        alert("Error al eliminar la categoría");
      }
    }
  };

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
        <div>
          <h2 className="fw-bold text-slate-800 mb-1">Gestión de Categorías</h2>
          <p className="text-muted mb-0">
            Entidad con CRUD completo: Crea, consulta, actualiza y elimina categorías de productos.
          </p>
        </div>
        {usuarioAutenticado ? (
          <Button variant="success" onClick={abrirCrear} className="px-4">
            ➕ Nueva Categoría
          </Button>
        ) : (
          <Badge bg="secondary" className="p-2">
            Inicia sesión para gestionar categorías
          </Badge>
        )}
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Card className="shadow-sm border-0 rounded-4 overflow-hidden">
        <Card.Body className="p-0">
          <Table responsive hover className="align-middle mb-0 text-center">
            <thead className="table-primary">
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Fecha de Creación</th>
                <th>Acciones (CRUD)</th>
              </tr>
            </thead>
            <tbody>
              {categorias && categorias.length > 0 ? (
                categorias.map((cat, index) => (
                  <tr key={cat._id || index}>
                    <td className="text-muted">{index + 1}</td>
                    <td className="fw-bold text-capitalize text-start">
                      🏷️ {cat.nombre}
                    </td>
                    <td className="text-muted text-start" style={{ maxWidth: "320px" }}>
                      {cat.descripcion || "Sin descripción"}
                    </td>
                    <td className="small text-muted">
                      {cat.fechaCreacion ? new Date(cat.fechaCreacion).toLocaleDateString() : "—"}
                    </td>
                    <td>
                      {usuarioAutenticado ? (
                        <div className="d-flex justify-content-center gap-2">
                          <Button
                            size="sm"
                            variant="primary"
                            onClick={() => abrirEditar(cat)}
                          >
                            Editar
                          </Button>
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => manejarEliminar(cat._id, cat.nombre)}
                          >
                            Eliminar
                          </Button>
                        </div>
                      ) : (
                        <span className="small text-muted">Solo lectura</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-4 text-muted">
                    {cargando ? "Cargando categorías..." : "No hay categorías registradas."}
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <FormularioCategoria
        mostrar={mostrarModal}
        cerrarModal={() => setMostrarModal(false)}
        categoriaSeleccionada={categoriaSeleccionada}
        actualizarCategorias={cargarCategorias}
      />
    </Container>
  );
}

export default CategoriasView;

