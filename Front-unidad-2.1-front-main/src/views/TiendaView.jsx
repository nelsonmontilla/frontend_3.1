import React, { useEffect } from "react";
import Inicio from "../paginas/Inicio";

function TiendaView({ cambiarVista }) {
  useEffect(() => {
    document.title = "Tienda y Productos | UVM Shop";
  }, []);

  return <Inicio cambiarVista={cambiarVista} />;
}

export default TiendaView;
