import { useSelector, useDispatch } from "react-redux";
import {
  obtenerProductosThunk,
  crearProductoThunk,
  actualizarProductoThunk,
  eliminarProductoThunk,
  setBusqueda,
  setCategoria,
  setPaginaActual,
  setProductoSeleccionado,
  limpiarProductoSeleccionado,
} from "../store/slices/productosSlice";

export const useProductos = () => {
  const dispatch = useDispatch();
  const {
    items: productos,
    productoSeleccionado,
    paginaActual,
    totalPaginas,
    busqueda,
    categoria,
    cargando,
    error,
  } = useSelector((state) => state.productos);

  const cargarProductos = (pagina = paginaActual, query = busqueda, cat = categoria) => {
    dispatch(obtenerProductosThunk({ pagina, query, categoria: cat }));
  };

  const crearProducto = async (producto) => {
    return await dispatch(crearProductoThunk(producto));
  };

  const actualizarProducto = async (id, producto) => {
    return await dispatch(actualizarProductoThunk({ id, producto }));
  };

  const eliminarProducto = async (id) => {
    return await dispatch(eliminarProductoThunk(id));
  };

  const cambiarPagina = (nuevaPagina) => {
    dispatch(setPaginaActual(nuevaPagina));
  };

  const cambiarBusqueda = (nuevaBusqueda) => {
    dispatch(setBusqueda(nuevaBusqueda));
  };

  const cambiarCategoria = (nuevaCategoria) => {
    dispatch(setCategoria(nuevaCategoria));
  };

  const seleccionarProducto = (producto) => {
    dispatch(setProductoSeleccionado(producto));
  };

  const deseleccionarProducto = () => {
    dispatch(limpiarProductoSeleccionado());
  };

  return {
    productos,
    productoSeleccionado,
    paginaActual,
    totalPaginas,
    busqueda,
    categoria,
    cargando,
    error,
    cargarProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto,
    cambiarPagina,
    cambiarBusqueda,
    cambiarCategoria,
    seleccionarProducto,
    deseleccionarProducto,
  };
};

export default useProductos;
