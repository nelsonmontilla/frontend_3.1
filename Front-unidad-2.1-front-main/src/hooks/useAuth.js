import { useSelector, useDispatch } from "react-redux";
import {
  loginThunk,
  registrarThunk,
  logout as logoutAction,
  obtenerPerfilThunk,
  limpiarErroresAuth,
} from "../store/slices/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const {
    usuarioAutenticado,
    rolUsuario,
    token,
    cargando,
    errorLogin,
    errorRegistro,
  } = useSelector((state) => state.auth);

  const login = async (email, contraseña) => {
    const resultado = await dispatch(loginThunk({ email, contraseña }));
    if (loginThunk.rejected.match(resultado)) {
      return resultado.payload || "Error al iniciar sesión";
    }
    return null;
  };

  const registrar = async (datos) => {
    const resultado = await dispatch(registrarThunk(datos));
    if (registrarThunk.rejected.match(resultado)) {
      return resultado.payload || "Error al registrar el usuario";
    }
    return null;
  };

  const logout = () => {
    dispatch(logoutAction());
  };

  const verificarSesion = () => {
    if (token) {
      dispatch(obtenerPerfilThunk());
    }
  };

  const limpiarErrores = () => {
    dispatch(limpiarErroresAuth());
  };

  return {
    usuarioAutenticado,
    rolUsuario,
    token,
    cargando,
    errorLogin,
    errorRegistro,
    login,
    registrar,
    logout,
    verificarSesion,
    limpiarErrores,
  };
};

export default useAuth;
