import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Row, Col, Spinner, Alert, Badge, ListGroup, Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { getPerfil } from '../services/authService';
import './Perfil.css'; // <-- IMPORTAMOS EL CSS DE PERFIL

const Perfil = () => {
  const { user, logout } = useAuth(); // <-- Obtenemos logout del contexto
  const navigate = useNavigate();
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        const data = await getPerfil();
        setPerfil(data.usuario);
      } catch (err) {
        setError('Error al cargar el perfil');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    cargarPerfil();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirigimos al login después de cerrar sesión
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="success" />
        <p className="mt-3">Cargando perfil...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  // Usamos los datos del 'perfil' (de la API) si existen, 
  // si no, usamos los del 'user' (del contexto) como fallback.
  const displayUser = perfil || user;

  return (
    // Aplicamos la clase de fondo de página
    <div className="perfil-page">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={7}>
            {/* Aplicamos la clase de tarjeta personalizada */}
            <Card className="perfil-card">
              
              {/* Header oscuro, como en tu estética */}
              <Card.Header className="perfil-header">
                <h2 className="perfil-title">{displayUser?.nombre}</h2>
                <p className="perfil-email">{displayUser?.email}</p>
              </Card.Header>

              <Card.Body className="perfil-body">
                <h5 className="perfil-section-title">Detalles de la Cuenta</h5>
                
                {/* Lista de detalles */}
                <ListGroup variant="flush" className="mb-4">
                  <ListGroup.Item>
                    <strong>Rol:</strong>
                    <Badge bg={displayUser?.rol === 'admin' ? 'danger' : 'success'} pill>
                      {displayUser?.rol === 'admin' ? 'Administrador' : 'Usuario'}
                    </Badge>
                  </ListGroup.Item>
                  
                  <ListGroup.Item>
                    <strong>Estado:</strong>
                    <Badge bg={displayUser?.activo ? 'success' : 'secondary'} pill>
                      {displayUser?.activo ? 'Activo' : 'Inactivo'}
                    </Badge>
                  </ListGroup.Item>
                  
                  <ListGroup.Item>
                    <strong>Miembro desde:</strong>
                    <span className="text-muted">
                      {displayUser?.createdAt 
                        ? new Date(displayUser.createdAt).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })
                        : 'No disponible'}
                    </span>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>

              {/* Pie de tarjeta con el botón de logout */}
              <Card.Footer className="perfil-footer">
                <Button 
                  className="btn-logout" 
                  onClick={handleLogout}
                >
                  Cerrar Sesión
                </Button>
              </Card.Footer>

            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Perfil;