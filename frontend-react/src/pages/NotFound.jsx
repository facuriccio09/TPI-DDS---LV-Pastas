import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './NotFound.css'; // Crearemos este CSS ahora

const NotFound = ({
  titulo = "404 - Página No Encontrada",
  mensaje = "Oops! Parece que el producto que buscas no existe o fue removido.",
  mostrarBoton = true
}) => {
  return (
    <div className="notfound-page">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6} className="text-center">
            <div className="notfound-card">
              <div className="notfound-icon">
                🍝
              </div>
              <h1 className="notfound-title">{titulo}</h1>
              <p className="notfound-message">
                {mensaje}
              </p>
              {mostrarBoton && (
                <Button 
                  as={Link} 
                  to="/" 
                  variant="success" 
                  className="btn-notfound-home"
                >
                  Volver al Inicio
                </Button>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NotFound;