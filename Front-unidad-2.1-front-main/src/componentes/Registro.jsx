// src/componentes/Registro.jsx
import React from "react";
import { useAuth, useForm } from "../hooks";

const Registro = () => {
  const { registrar } = useAuth();
  const { valores, manejarCambio, resetear } = useForm({
    nombreUsuario: "",
    nombreCompleto: "",
    email: "",
    contraseña: "",
    confirmarContraseña: "",
  });

  const manejarSubmit = async (e) => {
    e.preventDefault();
    if (valores.contraseña !== valores.confirmarContraseña) {
      alert("Las contraseñas no coinciden");
      return;
    }
    const error = await registrar(valores);
    if (!error) {
      alert("Usuario registrado con éxito");
      resetear();
    } else {
      alert(error);
    }
  };

  return (
    <form onSubmit={manejarSubmit}>
      <h2>Registrarse</h2>
      <div>
        <label>Nombre de Usuario:</label>
        <input
          type="text"
          name="nombreUsuario"
          value={valores.nombreUsuario}
          onChange={manejarCambio}
          required
        />
      </div>
      <div>
        <label>Nombre Completo:</label>
        <input
          type="text"
          name="nombreCompleto"
          value={valores.nombreCompleto}
          onChange={manejarCambio}
          required
        />
      </div>
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
      <div>
        <label>Confirmar Contraseña:</label>
        <input
          type="password"
          name="confirmarContraseña"
          value={valores.confirmarContraseña}
          onChange={manejarCambio}
          required
        />
      </div>
      <button type="submit">Registrarse</button>
    </form>
  );
};

export default Registro;
