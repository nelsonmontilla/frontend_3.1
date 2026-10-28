// src/componentes/Login.jsx
import React from "react";
import { useAuth, useForm } from "../hooks";

const Login = () => {
  const { login } = useAuth();
  const { valores, manejarCambio, resetresetear } = useForm({
    email: "",
    contraseña: "",
  });

  const manejarSubmit = async (e) => {
    e.preventDefault();
    const error = await login(valores.email, valores.contraseña);
    if (!error) {
      alert("Inicio de sesión exitoso");
    } else {
      alert(error);
    }
  };

  return (
    <form onSubmit={manejarSubmit}>
      <h2>Iniciar Sesión</h2>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={valores.email}
          onChange={manejarCambio}
          required
        />
      </div>
      <div>
        <label>Contraseña:</label>
        <input
          type="password"
          name="contraseña"
          value={valores.contraseña}
          onChange={manejarCambio}
          required
        />
      </div>
      <button type="submit">Iniciar Sesión</button>
    </form>
  );
};

export default Login;
