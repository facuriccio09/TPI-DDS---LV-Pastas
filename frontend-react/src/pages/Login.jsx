import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Row, Col, Spinner } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { user, login, loading } = useAuth();

  useEffect(() => {
    // Si ya está autenticado, redirigir al home
    if (user) {
      navigate('/');
    } else if (!loading) {
      // Si no está autenticado y Keycloak ya terminó de cargar, redirigir a Keycloak
      login();
    }
  }, [user, loading, navigate, login]);

  return (
    <div className="login-page">
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card className="login-card">
              <Card.Body className="text-center py-5">
                <Spinner animation="border" variant="success" />
                <p className="mt-3">Redirigiendo a Keycloak...</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;