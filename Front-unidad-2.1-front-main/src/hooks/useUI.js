import { useSelector, useDispatch } from "react-redux";
import {
  cambiarVista as cambiarVistaAction,
  abrirModal as abrirModalAction,
  cerrarModal as cerrarModalAction,
  cerrarTodosLosModales as cerrarTodosAction,
} from "../store/slices/uiSlice";

export const useUI = () => {
  const dispatch = useDispatch();
  const { vistaActual, modales } = useSelector((state) => state.ui);

  const cambiarVista = (vista) => {
    dispatch(cambiarVistaAction(vista));
  };

  const abrirModal = (nombreModal) => {
    dispatch(abrirModalAction(nombreModal));
  };

  const cerrarModal = (nombreModal) => {
    dispatch(cerrarModalAction(nombreModal));
  };

  const cerrarTodosLosModales = () => {
    dispatch(cerrarTodosAction());
  };

  return {
    vistaActual,
    modales,
    cambiarVista,
    abrirModal,
    cerrarModal,
    cerrarTodosLosModales,
  };
};

export default useUI;
