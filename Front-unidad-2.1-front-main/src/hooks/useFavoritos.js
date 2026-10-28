import { useSelector, useDispatch } from "react-redux";
import {
  obtenerFavoritosThunk,
  agregarFavoritoThunk,
  eliminarFavoritoThunk,
} from "../store/slices/favoritosSlice";

export const useFavoritos = () => {
  const dispatch = useDispatch();
  const { items: favoritos, cargando, error } = useSelector(
    (state) => state.favoritos
  );

  const cargarFavoritos = () => {
    dispatch(obtenerFavoritosThunk());
  };

  const agregarAFavoritos = async (productoId) => {
    return await dispatch(agregarFavoritoThunk(productoId));
  };

  const eliminarDeFavoritos = async (productoId) => {
    return await dispatch(eliminarFavoritoThunk(productoId));
  };

  return {
    favoritos,
    cargando,
    error,
    cargarFavoritos,
    agregarAFavoritos,
    eliminarDeFavoritos,
  };
};

export default useFavoritos;
