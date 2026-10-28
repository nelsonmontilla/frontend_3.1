// src/context/AuthContext.jsx
import React, { createContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  obtenerPerfilThunk,
  loginThunk,
  registrarThunk,
  logout as logoutAction,
} from "../store/slices/authSlice";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { usuarioAutenticado, rolUsuario, cargando, errorLogin, errorRegistro } =
    useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !usuarioAutenticado) {
      dispatch(obtenerPerfilThunk());
    }
  }, [dispatch, usuarioAutenticado]);

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

  return (
    <AuthContext.Provider
      value={{
        usuarioAutenticado,
        rolUsuario,
        cargando,
        errorLogin,
        errorRegistro,
        login,
        registrar,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
