import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Row, Col, Spinner } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const { user, register, loading } = useAuth();

  useEffect(() => {
    // Si ya está autenticado, redirigir al home
    if (user) {
      navigate('/');
    } else if (!loading) {
      // Si no está autenticado y Keycloak ya terminó de cargar, redirigir al registro de Keycloak
      register();
    }
  }, [user, loading, navigate, register]);

  return (
    <div className="register-page">
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card className="register-card">
              <Card.Body className="text-center py-5">
                <Spinner animation="border" variant="success" />
                <p className="mt-3">Redirigiendo al registro...</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;