import { useSelector, useDispatch } from "react-redux";
import {
  obtenerCategoriasThunk,
  crearCategoriaThunk,
  actualizarCategoriaThunk,
  eliminarCategoriaThunk,
  setCategoriaSeleccionada,
  limpiarCategoriaSeleccionada,
} from "../store/slices/categoriasSlice";

export const useCategorias = () => {
  const dispatch = useDispatch();
  const { items: categorias, categoriaSeleccionada, cargando, error } = useSelector(
    (state) => state.categorias
  );

  const cargarCategorias = () => {
    dispatch(obtenerCategoriasThunk());
  };

  const crearCategoria = async (datos) => {
    return await dispatch(crearCategoriaThunk(datos));
  };

  const actualizarCategoria = async (id, datos) => {
    return await dispatch(actualizarCategoriaThunk({ id, categoria: datos }));
  };

  const eliminarCategoria = async (id) => {
    return await dispatch(eliminarCategoriaThunk(id));
  };

  const seleccionarCategoria = (categoria) => {
    dispatch(setCategoriaSeleccionada(categoria));
  };

  const deseleccionarCategoria = () => {
    dispatch(limpiarCategoriaSeleccionada());
  };

  return {
    categorias,
    categoriaSeleccionada,
    cargando,
    error,
    cargarCategorias,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria,
    seleccionarCategoria,
    deseleccionarCategoria,
  };
};

export default useCategorias;

