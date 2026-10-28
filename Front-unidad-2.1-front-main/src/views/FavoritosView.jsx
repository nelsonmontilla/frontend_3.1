// src/views/FavoritosView.jsx
import React, { useEffect } from "react";
import { Container, Card, Table, Button, Badge, Alert } from "react-bootstrap";
import { useFavoritos, useAuth } from "../hooks";

function FavoritosView({ cambiarVista }) {
  const { favoritos, cargarFavoritos, eliminarDeFavoritos, cargando } =
    useFavoritos();
  const { usuarioAutenticado } = useAuth();

  useEffect(() => {
    document.title = "Mis Favoritos | UVM Shop";
    if (usuarioAutenticado) {
      cargarFavoritos();
    }
  }, [usuarioAutenticado]);

  if (!usuarioAutenticado) {
    return (
      <Container className="py-5 text-center">
        <Card className="shadow-sm border-0 rounded-4 p-5 max-w-lg mx-auto">
          <Card.Body>
            <h3 className="fw-bold mb-3">Sección de Favoritos</h3>
            <p className="text-muted mb-4">
              Debes iniciar sesión para consultar y gestionar tus productos favoritos.
            </p>
            <Button variant="primary" onClick={() => cambiarVista("tienda")}>
              Ir a la Tienda
            </Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
        <div>
          <h2 className="fw-bold text-slate-800 mb-1">Mis Productos Favoritos</h2>
          <p className="text-muted mb-0">
            Administra los artículos que has guardado en tu lista de deseos.
          </p>
        </div>
        <Button variant="outline-primary" onClick={() => cambiarVista("tienda")}>
          🛒 Seguir explorando
        </Button>
      </div>

      <Card className="shadow-sm border-0 rounded-4 overflow-hidden">
        <Card.Body className="p-0">
          {favoritos && favoritos.length > 0 ? (
            <Table responsive hover className="align-middle mb-0 text-center">
              <thead className="table-primary">
                <tr>
                  <th>Imagen</th>
                  <th>Producto</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {favoritos.map((prod) => (
                  <tr key={prod._id}>
                    <td>
                      <img
                        src={prod.imagen || "https://placehold.co/70x70?text=Item"}
                        alt={prod.nombre}
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                    </td>
                    <td className="fw-semibold text-start">{prod.nombre}</td>
                    <td>
                      <Badge bg="secondary" className="text-capitalize">
                        {prod.categoria}
                      </Badge>
                    </td>
                    <td className="fw-bold text-success">${prod.precio}</td>
                    <td>{prod.cantidad} un.</td>
                    <td>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => eliminarDeFavoritos(prod._id)}
                      >
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="p-5 text-center">
              <p className="text-muted fs-5 mb-3">
                {cargando
                  ? "Cargando tus favoritos..."
                  : "No tienes productos en tu lista de favoritos."}
              </p>
              <Button variant="primary" onClick={() => cambiarVista("tienda")}>
                Explorar Productos
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default FavoritosView;

