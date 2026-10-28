import { useState } from "react";

export const useForm = (valoresIniciales = {}) => {
  const [valores, setValores] = useState(valoresIniciales);

  const manejarCambio = (e) => {
    const { name, value, type, checked } = e.target;
    setValores((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetear = () => {
    setValores(valoresIniciales);
  };

  const establecerValores = (nuevosValores) => {
    setValores(nuevosValores);
  };

  return {
    valores,
    manejarCambio,
    resetear,
    establecerValores,
  };
};

export default useForm;
