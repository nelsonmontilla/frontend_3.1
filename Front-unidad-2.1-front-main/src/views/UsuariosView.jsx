// src/views/UsuariosView.jsx
import React, { useEffect, useState } from "react";
import { Container, Table, Button, Badge, Card, Alert } from "react-bootstrap";
import { useAuth } from "../hooks";
import api from "../servicios/api";
import ModalEditarUsuario from "../componentes/ModalEditarUsuario";

function UsuariosView({ cambiarVista }) {
  const { usuarioAutenticado, rolUsuario } = useAuth();
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);

  useEffect(() => {
    document.title = "Gestión de Usuarios | UVM Shop";
    if (rolUsuario === "admin") {
      obtenerUsuarios();
    }
  }, [rolUsuario]);

  const obtenerUsuarios = async () => {
    setCargando(true);
    setError(null);
    try {
      const { data } = await api.get("/usuarios");
      setUsuarios(data);
    } catch (err) {
      console.error("Error al obtener usuarios:", err);
      setError("No se pudieron cargar los usuarios. Verifica tus permisos.");
    } finally {
      setCargando(false);
    }
  };

  const abrirEditar = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setMostrarModalEditar(true);
  };

  const manejarEliminar = async (id, nombre) => {
    if (!window.confirm(`¿Seguro que deseas eliminar definitivamente al usuario "${nombre}"?`)) {
      return;
    }
    try {
      await api.delete(`/usuarios/${id}`);
      obtenerUsuarios();
    } catch (err) {
      alert(err.response?.data?.mensaje || "Error al eliminar el usuario");
    }
  };

  if (rolUsuario !== "admin") {
    return (
      <Container className="py-5 text-center">
        <Card className="shadow-sm border-0 rounded-4 p-5 max-w-lg mx-auto">
          <Card.Body>
            <h3 className="fw-bold mb-3">Acceso Restringido</h3>
            <p className="text-muted mb-4">
              Esta sección requiere permisos de Administrador para gestionar la base de usuarios.
            </p>
            <Button variant="primary" onClick={() => cambiarVista("tienda")}>
              Volver a la Tienda
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
          <h2 className="fw-bold text-slate-800 mb-1">Panel de Usuarios Registrados</h2>
          <p className="text-muted mb-0">
            Entidad con CRUD completo: Administra cuentas, roles, actualización y eliminación de usuarios.
          </p>
        </div>
        <Button variant="outline-primary" onClick={obtenerUsuarios}>
          🔄 Actualizar Lista
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Card className="shadow-sm border-0 rounded-4 overflow-hidden">
        <Card.Body className="p-0">
          <Table responsive hover className="align-middle mb-0 text-center">
            <thead className="table-primary">
              <tr>
                <th>Usuario</th>
                <th>Nombre Completo</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Rol</th>
                <th>Fecha de Registro</th>
                <th>Acciones (CRUD)</th>
              </tr>
            </thead>
            <tbody>
              {usuarios && usuarios.length > 0 ? (
                usuarios.map((u) => (
                  <tr key={u._id}>
                    <td className="fw-bold text-start">@{u.nombreUsuario}</td>
                    <td className="text-start">{u.nombreCompleto}</td>
                    <td>{u.email}</td>
                    <td>{u.telefono || "—"}</td>
                    <td>
                      <Badge bg={u.rol === "admin" ? "danger" : "secondary"}>
                        {u.rol}
                      </Badge>
                    </td>
                    <td className="small text-muted">
                      {u.fechaCreacion ? new Date(u.fechaCreacion).toLocaleDateString() : "—"}
                    </td>
                    <td>
                      <div className="d-flex justify-content-center gap-2">
                        <Button
                          size="sm"
                          variant="warning"
                          onClick={() => abrirEditar(u)}
                        >
                          Editar
                        </Button>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => manejarEliminar(u._id, u.nombreUsuario)}
                        >
                          Eliminar
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-4 text-muted">
                    {cargando ? "Cargando usuarios..." : "No se encontraron usuarios."}
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <ModalEditarUsuario
        mostrar={mostrarModalEditar}
        cerrarModal={() => setMostrarModalEditar(false)}
        usuarioId={usuarioSeleccionado?._id}
        actualizarUsuarios={obtenerUsuarios}
      />
    </Container>
  );
}

export default UsuariosView;

