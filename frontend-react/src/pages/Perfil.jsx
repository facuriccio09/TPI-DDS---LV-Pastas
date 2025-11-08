import { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Spinner, Alert, Badge } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { getPerfil } from '../services/authService';

const Perfil = () => {
  const { user } = useAuth();
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

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card>
            <Card.Header className="bg-success text-white">
              <h3 className="mb-0">Mi Perfil</h3>
            </Card.Header>
            <Card.Body>
              <div className="mb-3">
                <strong>Nombre:</strong>
                <p className="text-muted">{perfil?.nombre || user?.nombre}</p>
              </div>

              <div className="mb-3">
                <strong>Email:</strong>
                <p className="text-muted">{perfil?.email || user?.email}</p>
              </div>

              <div className="mb-3">
                <strong>Rol:</strong>
                <div>
                  <Badge bg={perfil?.rol === 'admin' ? 'danger' : 'primary'}>
                    {perfil?.rol === 'admin' ? 'Administrador' : 'Usuario'}
                  </Badge>
                </div>
              </div>

              <div className="mb-3">
                <strong>Estado:</strong>
                <div>
                  <Badge bg={perfil?.activo ? 'success' : 'secondary'}>
                    {perfil?.activo ? 'Activo' : 'Inactivo'}
                  </Badge>
                </div>
              </div>

              <div className="mb-3">
                <strong>Miembro desde:</strong>
                <p className="text-muted">
                  {perfil?.createdAt 
                    ? new Date(perfil.createdAt).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })
                    : 'No disponible'}
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Perfil;
