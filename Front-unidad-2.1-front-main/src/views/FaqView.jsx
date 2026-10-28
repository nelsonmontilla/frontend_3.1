// src/views/FaqView.jsx
import React, { useEffect } from "react";
import { Container, Accordion, Card } from "react-bootstrap";

function FaqView() {
  useEffect(() => {
    document.title = "Preguntas Frecuentes | UVM Shop";
  }, []);

  const faqs = [
    {
      q: "¿Cómo creo una cuenta de usuario?",
      a: "Haz clic en el botón 'Registrarse' ubicado en la barra superior. Llena los campos con tu nombre de usuario, nombre completo, correo electrónico y contraseña. Una vez registrado, tu sesión se iniciará de forma automática.",
    },
    {
      q: "¿Quién puede vender o crear productos?",
      a: "Cualquier usuario autenticado puede publicar productos haciendo clic en 'Vender / Crear Producto'. Como vendedor, tienes permisos completos para editar y eliminar los productos que hayas publicado.",
    },
    {
      q: "¿Qué permisos tiene el Administrador?",
      a: "El usuario con rol 'admin' puede editar o eliminar cualquier producto del sistema, así como acceder a la tabla de gestión de usuarios para modificar perfiles o eliminarlos si es necesario.",
    },
    {
      q: "¿Cómo funciona la lista de favoritos?",
      a: "Al navegar por la tienda, haz clic en la estrella '⭐ Favorito' en cualquier producto. Podrás consultar y gestionar todos tus artículos guardados desde la sección 'Favoritos'.",
    },
    {
      q: "¿Qué tecnología respalda esta aplicación?",
      a: "El backend está desarrollado sobre Node.js y Express conectado a MongoDB con autenticación JWT. El frontend está implementado en React 19 con Vite, Redux Toolkit para estado global, y diseño responsivo con Bootstrap.",
    },
    {
      q: "¿Puedo filtrar y buscar artículos por categoría?",
      a: "Sí, en la sección 'Tienda' cuentas con una barra de búsqueda en tiempo real y un selector dinámico para filtrar por categoría (Ropa, Electrónica, Hogar, etc.).",
    },
  ];

  return (
    <Container className="py-5" style={{ maxWidth: 850 }}>
      <div className="text-center mb-5">
        <span className="badge bg-primary px-3 py-2 text-uppercase mb-2">
          Ayuda y Soporte
        </span>
        <h1 className="fw-bold text-slate-800">Preguntas Frecuentes (FAQ)</h1>
        <p className="text-muted">
          Respuestas rápidas a las consultas más comunes sobre el uso y funcionamiento del sistema.
        </p>
      </div>

      <Card className="shadow-sm border-0 rounded-4 overflow-hidden p-3">
        <Accordion defaultActiveKey="0" flush>
          {faqs.map((faq, index) => (
            <Accordion.Item eventKey={String(index)} key={index}>
              <Accordion.Header className="fw-semibold">
                {faq.q}
              </Accordion.Header>
              <Accordion.Body className="text-muted">
                {faq.a}
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </Card>
    </Container>
  );
}

export default FaqView;

