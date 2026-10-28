// src/componentes/ListaProductos.jsx
import React from "react";
import { Row, Col, Card, Button, Table, Badge } from "react-bootstrap";
import { useFavoritos } from "../hooks";

const ListaProductos = ({
  productos,
  abrirModalParaEditarProducto,
  eliminarProducto,
  rolUsuario,
  usuarioAutenticado,
  modoVista = "tarjetas",
}) => {
  const { agregarAFavoritos } = useFavoritos();

  const manejarAgregarFavorito = async (productoId) => {
    try {
      await agregarAFavoritos(productoId);
      alert("Producto agregado a tus favoritos");
    } catch (error) {
      console.error("Error al agregar a favoritos", error);
    }
  };

  const puedeEditarOEliminar = (producto) => {
    if (!usuarioAutenticado) return false;
    if (rolUsuario === "admin") return true;
    const vendedorId = typeof producto.vendedor === "object" ? producto.vendedor?._id : producto.vendedor;
    return String(vendedorId) === String(usuarioAutenticado._id);
  };

  if (!productos || productos.length === 0) {
    return (
      <div className="text-center py-5 bg-white rounded-4 shadow-sm my-4">
        <p className="text-muted fs-5 mb-0">No se encontraron productos registrados.</p>
      </div>
    );
  }

  // Vista de Tabla
  if (modoVista === "tabla") {
    return (
      <div className="bg-white rounded-4 shadow-sm p-3 my-4 overflow-hidden">
        <Table responsive hover className="align-middle mb-0 text-center">
          <thead className="table-primary">
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto._id}>
                <td>
                  <img
                    src={producto.imagen || "https://placehold.co/80x80?text=Producto"}
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
                <td>
                  <Badge bg="secondary" className="text-capitalize">
                    {producto.categoria}
                  </Badge>
                </td>
                <td className="fw-bold text-success">${producto.precio}</td>
                <td>
                  <Badge bg={producto.cantidad > 0 ? "info" : "danger"}>
                    {producto.cantidad} un.
                  </Badge>
                </td>
                <td className="text-muted small text-start" style={{ maxWidth: "200px" }}>
                  {producto.descripcion || "Sin descripción"}
                </td>
                <td>
                  <div className="d-flex justify-content-center gap-2 flex-wrap">
                    {usuarioAutenticado && (
                      <Button
                        size="sm"
                        variant="outline-warning"
                        onClick={() => manejarAgregarFavorito(producto._id)}
                        title="Favorito"
                      >
                        ⭐
                      </Button>
                    )}
                    {puedeEditarOEliminar(producto) && (
                      <>
                        <Button
                          size="sm"
                          variant="primary"
                          onClick={() => abrirModalParaEditarProducto(producto)}
                        >
                          Editar
                        </Button>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => eliminarProducto(producto._id)}
                        >
                          Eliminar
                        </Button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }

  // Vista de Tarjetas
  return (
    <Row className="mt-4 g-4">
      {productos.map((producto) => (
        <Col md={6} lg={4} key={producto._id}>
          <Card className="h-100 shadow-sm border-0 rounded-4 overflow-hidden">
            <div className="img-container" style={{ height: "200px", overflow: "hidden", background: "#f1f5f9" }}>
              <Card.Img
                variant="top"
                src={producto.imagen || "https://placehold.co/400x200?text=Producto"}
                alt={producto.nombre}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <Card.Body className="d-flex flex-column">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <Card.Title className="fw-bold text-slate-800 mb-0">
                  {producto.nombre}
                </Card.Title>
                <Badge bg="primary" className="text-capitalize">
                  {producto.categoria}
                </Badge>
              </div>

              <Card.Text className="text-muted small flex-grow-1">
                {producto.descripcion || "Sin descripción detallada."}
              </Card.Text>

              <div className="d-flex justify-content-between align-items-center my-2">
                <span className="fs-5 fw-bold text-success">${producto.precio} USD</span>
                <span className="small text-muted">Stock: <strong>{producto.cantidad}</strong></span>
              </div>

              <div className="d-flex gap-2 mt-3 pt-2 border-top">
                {usuarioAutenticado && (
                  <Button
                    variant="outline-warning"
                    className="flex-grow-1"
                    onClick={() => manejarAgregarFavorito(producto._id)}
                  >
                    ⭐ Favorito
                  </Button>
                )}
                {puedeEditarOEliminar(producto) && (
                  <>
                    <Button
                      variant="outline-primary"
                      onClick={() => abrirModalParaEditarProducto(producto)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="outline-danger"
                      onClick={() => eliminarProducto(producto._id)}
                    >
                      Eliminar
                    </Button>
                  </>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ListaProductos;
