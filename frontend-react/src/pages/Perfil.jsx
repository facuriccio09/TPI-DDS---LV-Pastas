import { useNavigate } from 'react-router-dom';
import { Container, Card, Row, Col, Badge, ListGroup, Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import './Perfil.css';

const Perfil = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="perfil-page">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={7}>
            <Card className="perfil-card">
              
              <Card.Header className="perfil-header">
                <h2 className="perfil-title">{user?.nombre}</h2>
                <p className="perfil-email">{user?.email}</p>
              </Card.Header>

              <Card.Body className="perfil-body">
                <h5 className="perfil-section-title">Detalles de la Cuenta</h5>
                
                <ListGroup variant="flush" className="mb-4">
                  <ListGroup.Item>
                    <strong>ID de Usuario:</strong>
                    <span className="text-muted ms-2">{user?.id}</span>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <strong>Rol:</strong>
                    <Badge bg={user?.rol === 'admin' ? 'danger' : 'success'} className="ms-2" pill>
                      {user?.rol === 'admin' ? 'Administrador' : 'Usuario'}
                    </Badge>
                  </ListGroup.Item>
                  
                  <ListGroup.Item>
                    <strong>Email:</strong>
                    <span className="text-muted ms-2">{user?.email}</span>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>

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
