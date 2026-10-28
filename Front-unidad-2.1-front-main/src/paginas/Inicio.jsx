// src/paginas/Inicio.jsx
import React, { useEffect, useState } from "react";
import { Container, Pagination, Button, ButtonGroup } from "react-bootstrap";
import FiltroProductos from "../componentes/FiltroProductos";
import ListaProductos from "../componentes/ListaProductos";
import ModalLogin from "../componentes/ModalLogin";
import ModalRegistro from "../componentes/ModalRegistro";
import FormularioProducto from "../componentes/FormularioProducto";
import ModalPerfilUsuario from "../componentes/ModalPerfilUsuario";
import ModalEditarUsuario from "../componentes/ModalEditarUsuario";
import ModalUsuarios from "../componentes/ModalUsuarios";
import ModalFavoritos from "../componentes/ModalFavoritos";
import { useAuth, useProductos, useFavoritos } from "../hooks";
import api from "../servicios/api";
import "./Inicio.css";

const Inicio = () => {
  const {
    productos,
    productoSeleccionado,
    paginaActual,
    totalPaginas,
    busqueda,
    categoria,
    cargando,
    cargarProductos,
    eliminarProducto,
    cambiarPagina,
    cambiarBusqueda,
    cambiarCategoria,
    seleccionarProducto,
    deseleccionarProducto,
  } = useProductos();

  const { usuarioAutenticado, rolUsuario, login, registrar } = useAuth();
  const { favoritos } = useFavoritos();

  const [mostrarModalProducto, setMostrarModalProducto] = useState(false);
  const [mostrarModalLogin, setMostrarModalLogin] = useState(false);
  const [mostrarModalRegistro, setMostrarModalRegistro] = useState(false);
  const [mostrarModalPerfil, setMostrarModalPerfil] = useState(false);
  const [mostrarModalUsuarios, setMostrarModalUsuarios] = useState(false);
  const [mostrarModalEditarUsuario, setMostrarModalEditarUsuario] = useState(false);
  const [mostrarModalFavoritos, setMostrarModalFavoritos] = useState(false);

  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [errorLogin, setErrorLogin] = useState(null);
  const [errorRegistro, setErrorRegistro] = useState(null);

  // Modo de visualización: 'tarjetas' o 'tabla'
  const [modoVista, setModoVista] = useState("tarjetas");

  useEffect(() => {
    cargarProductos(paginaActual, busqueda, categoria);
  }, [paginaActual, busqueda, categoria]);

  const obtenerUsuarios = async () => {
    try {
      const { data } = await api.get("/usuarios");
      setUsuarios(data);
      setMostrarModalUsuarios(true);
    } catch (error) {
      console.error("Error al obtener los usuarios", error);
    }
  };

  const abrirModalParaCrearProducto = () => {
    deseleccionarProducto();
    setMostrarModalProducto(true);
  };

  const abrirModalParaEditarProducto = (producto) => {
    seleccionarProducto(producto);
    setMostrarModalProducto(true);
  };

  const abrirModalPerfil = () => {
    setMostrarModalPerfil(true);
  };

  const abrirModalParaVerUsuarios = () => {
    obtenerUsuarios();
  };

  const abrirModalParaEditarUsuario = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setMostrarModalEditarUsuario(true);
  };

  const cerrarModal = () => {
    setMostrarModalProducto(false);
    setMostrarModalLogin(false);
    setMostrarModalRegistro(false);
    setMostrarModalPerfil(false);
    setMostrarModalUsuarios(false);
    setMostrarModalFavoritos(false);
    setMostrarModalEditarUsuario(false);
    setErrorLogin(null);
    setErrorRegistro(null);
    deseleccionarProducto();
  };

  const manejarSubmitLogin = async (email, contraseña) => {
    const mensajeError = await login(email, contraseña);
    if (mensajeError) {
      setErrorLogin(mensajeError);
    } else {
      cerrarModal();
    }
  };

  const manejarSubmitRegistro = async (datos) => {
    const mensajeError = await registrar(datos);
    if (mensajeError) {
      setErrorRegistro(mensajeError);
    } else {
      cerrarModal();
    }
  };

  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
        <div>
          <h1 className="fw-bold text-slate-800 mb-1">Inventario y Tienda de Productos</h1>
          <p className="text-muted mb-0">
            Administra productos con CRUD completo, gestiona usuarios y favoritos.
          </p>
        </div>

        {/* Selector de modo de vista: Tarjetas vs Tabla */}
        <ButtonGroup>
          <Button
            variant={modoVista === "tarjetas" ? "primary" : "outline-primary"}
            onClick={() => setModoVista("tarjetas")}
          >
            📱 Vista Cuadrícula
          </Button>
          <Button
            variant={modoVista === "tabla" ? "primary" : "outline-primary"}
            onClick={() => setModoVista("tabla")}
          >
            📊 Vista Tabla (CRUD)
          </Button>
        </ButtonGroup>
      </div>

      {usuarioAutenticado && (
        <div className="text-center mb-4 d-flex justify-content-center gap-3 flex-wrap">
          <Button variant="outline-secondary" onClick={abrirModalPerfil}>
            👤 Mi Perfil
          </Button>
          <Button variant="success" onClick={abrirModalParaCrearProducto}>
            ➕ Vender / Crear Producto
          </Button>
          <Button variant="outline-warning" onClick={() => setMostrarModalFavoritos(true)}>
            ⭐ Mis Favoritos ({favoritos?.length || 0})
          </Button>
          {rolUsuario === "admin" && (
            <Button variant="warning" onClick={abrirModalParaVerUsuarios}>
              👥 Tabla de Usuarios (Admin)
            </Button>
          )}
        </div>
      )}

      <FiltroProductos
        busqueda={busqueda}
        manejarCambioBusqueda={(e) => cambiarBusqueda(e.target.value)}
        categoria={categoria}
        manejarCambioCategoria={(e) => cambiarCategoria(e.target.value)}
      />

      {cargando ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2 text-muted">Cargando productos desde el servidor...</p>
        </div>
      ) : (
        <ListaProductos
          productos={productos}
          abrirModalParaEditarProducto={abrirModalParaEditarProducto}
          eliminarProducto={eliminarProducto}
          rolUsuario={rolUsuario}
          usuarioAutenticado={usuarioAutenticado}
          modoVista={modoVista}
        />
      )}

      {totalPaginas > 1 && (
        <Pagination className="justify-content-center mt-4">
          <Pagination.Prev
            onClick={() => cambiarPagina(paginaActual - 1)}
            disabled={paginaActual === 1}
          />
          {[...Array(totalPaginas).keys()].map((numero) => (
            <Pagination.Item
              key={numero + 1}
              active={numero + 1 === paginaActual}
              onClick={() => cambiarPagina(numero + 1)}
            >
              {numero + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => cambiarPagina(paginaActual + 1)}
            disabled={paginaActual === totalPaginas}
          />
        </Pagination>
      )}

      {/* Modales */}
      <FormularioProducto
        mostrar={mostrarModalProducto}
        cerrarModal={cerrarModal}
        productoSeleccionado={productoSeleccionado}
        obtenerProductos={() => cargarProductos(paginaActual, busqueda, categoria)}
      />

      <ModalLogin
        mostrar={mostrarModalLogin}
        cerrarModal={cerrarModal}
        manejarSubmitLogin={manejarSubmitLogin}
        errorLogin={errorLogin}
      />

      <ModalRegistro
        mostrar={mostrarModalRegistro}
        cerrarModal={cerrarModal}
        manejarSubmitRegistro={manejarSubmitRegistro}
        errorRegistro={errorRegistro}
      />

      <ModalPerfilUsuario
        mostrar={mostrarModalPerfil}
        cerrarModal={cerrarModal}
        usuarioId={usuarioAutenticado?._id}
      />

      <ModalUsuarios
        mostrar={mostrarModalUsuarios}
        cerrarModal={cerrarModal}
        usuarios={usuarios}
        abrirModalParaEditarUsuario={abrirModalParaEditarUsuario}
        actualizarUsuarios={obtenerUsuarios}
      />

      <ModalEditarUsuario
        mostrar={mostrarModalEditarUsuario}
        cerrarModal={cerrarModal}
        usuarioId={usuarioSeleccionado?._id}
        actualizarUsuarios={obtenerUsuarios}
      />

      <ModalFavoritos
        mostrar={mostrarModalFavoritos}
        cerrarModal={cerrarModal}
      />
    </Container>
  );
};

export default Inicio;
