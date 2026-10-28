import { useContext, useEffect, useState } from "react";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";
import AuthContext from "../context/AuthContext";

function LoginView({ cambiarVista }) {
  const { login, usuarioAutenticado, logout } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Login | UVM Shop";
  }, []);

  const manejarSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const mensaje = await login(email, contraseña);
    if (mensaje) {
      setError(mensaje);
      return;
    }

    cambiarVista("inicio");
  };

  return (
    <Container className="py-5">
      <Card className="mx-auto shadow-sm border-0" style={{ maxWidth: 480 }}>
        <Card.Body className="p-4">
          <h2 className="mb-4 text-center">Iniciar sesión</h2>

          {usuarioAutenticado ? (
            <div className="text-center">
              <p className="mb-3">Ya tienes una sesión activa.</p>
              <Button variant="outline-danger" onClick={logout}>
                Cerrar sesión
              </Button>
            </div>
          ) : (
            <Form onSubmit={manejarSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="correo@ejemplo.com"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  value={contraseña}
                  onChange={(e) => setContraseña(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </Form.Group>

              {error && <Alert variant="danger">{error}</Alert>}

              <Button type="submit" className="w-100">
                Entrar
              </Button>
            </Form>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default LoginView;
