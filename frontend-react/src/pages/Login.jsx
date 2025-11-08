import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Form, Button, Alert, Card, Row, Col } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { login as authServiceLogin } from '../services/authService';
import './Login.css'; // <-- IMPORTAR EL CSS

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuth(); // Importa la función login del contexto

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // 1. Llamar al servicio de autenticación
      const { usuario, token } = await authServiceLogin(email, password);
      
      // 2. Si tiene éxito, llamar al login del AuthContext
      login(usuario, token);

      // 3. Redirigir al usuario (ej. al inicio o al perfil si existe)
      navigate('/'); 

    } catch (err) {
      // El error vendrá del backend o del servicio
      setError(err.toString());
    } finally {
      setLoading(false);
    }
  };

  return (
    // Aplicamos la clase de fondo de página
    <div className="login-page">
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            {/* Aplicamos la clase de tarjeta personalizada */}
            <Card className="login-card">
              <Card.Header>
                <h2 className="login-title">Iniciar Sesión</h2>
              </Card.Header>

              <Card.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Ingresa tu email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="formBasicPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>
                  
                  <Button 
                    type="submit" 
                    className="btn-login" // Aplicamos la clase de botón
                    disabled={loading}
                  >
                    {loading ? 'Cargando...' : 'Ingresar'}
                  </Button>
                </Form>
                
                <div className="register-link">
                  <small>
                    ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
                  </small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;