import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import localAfuera from '../media/Local desde afuera.jpeg';
import ingresoLocal from '../media/Ingreso local.jpeg';
import localDentro from '../media/Dentro del local.jpeg';
import elaboracion from '../media/Elaboracion discos.jpeg';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay">
          <Container className="hero-content">
            <h1 className="hero-title">La Vesubiana</h1>
            <p className="hero-subtitle">Pastas Frescas Artesanales</p>
            <p className="hero-description">
              Más de 30 años elaborando las mejores pastas frescas de la zona
            </p>
            <Button 
              as={Link} 
              to="/productos" 
              variant="danger" 
              size="lg"
              className="hero-button"
            >
              Ver Productos
            </Button>
          </Container>
        </div>
      </section>

      {/* Sobre Nosotros */}
      <section className="sobre-nosotros py-5">
        <Container>
          <Row className="mb-5">
            <Col lg={12} className="text-center">
              <h2 className="section-title">Sobre Nosotros</h2>
              <div className="title-underline mx-auto"></div>
            </Col>
          </Row>

          <Row className="align-items-center mb-5">
            <Col lg={6} className="mb-4 mb-lg-0">
              <img 
                src={ingresoLocal} 
                alt="Ingreso al local" 
                className="img-fluid rounded shadow-lg"
              />
            </Col>
            <Col lg={6}>
              <h3 className="mb-3">Una Tradición Familiar</h3>
              <p className="text-muted lead">
                Somos una fábrica familiar de descendientes italianos, con más de <strong>30 años 
                de experiencia</strong> en el rubro de las pastas frescas artesanales.
              </p>
              <p className="text-muted">
                Nuestra pasión por la elaboración de pastas se transmite de generación en generación, 
                manteniendo las recetas tradicionales que nos caracterizan y que nuestros clientes 
                disfrutan día a día.
              </p>
            </Col>
          </Row>

          <Row className="align-items-center mb-5 flex-lg-row-reverse">
            <Col lg={6} className="mb-4 mb-lg-0">
              <img 
                src={localDentro} 
                alt="Dentro del local" 
                className="img-fluid rounded shadow-lg"
              />
            </Col>
            <Col lg={6}>
              <h3 className="mb-3">Calidad y Frescura</h3>
              <p className="text-muted lead">
                Elaboramos nuestras pastas <strong>diariamente</strong> con ingredientes frescos 
                y de primera calidad.
              </p>
              <p className="text-muted">
                Cada producto que sale de nuestra fábrica es elaborado con dedicación y amor, 
                siguiendo los métodos tradicionales que aprendimos de nuestros ancestros italianos.
              </p>
            </Col>
          </Row>

          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <img 
                src={elaboracion} 
                alt="Elaboración de discos" 
                className="img-fluid rounded shadow-lg"
              />
            </Col>
            <Col lg={6}>
              <h3 className="mb-3">Proceso Artesanal</h3>
              <p className="text-muted lead">
                Cada paso del proceso de elaboración se realiza con <strong>técnicas artesanales</strong>, 
                cuidando cada detalle.
              </p>
              <p className="text-muted">
                Desde el amasado hasta el relleno, todo se hace con las manos expertas de nuestro 
                equipo, garantizando el sabor y la textura que nos distingue.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Nuestros Productos Destacados */}
      <section className="productos-destacados py-5 bg-light">
        <Container>
          <Row className="mb-4">
            <Col lg={12} className="text-center">
              <h2 className="section-title">Nuestros Productos</h2>
              <div className="title-underline mx-auto"></div>
              <p className="text-muted mt-3">
                Descubrí nuestra amplia variedad de pastas frescas y salsas caseras
              </p>
            </Col>
          </Row>

          <Row>
            <Col md={4} className="mb-4">
              <Card className="product-card h-100 shadow-sm">
                <Card.Body className="text-center">
                  <div className="product-icon mb-3">🍝</div>
                  <Card.Title>Pastas Rellenas</Card.Title>
                  <Card.Text className="text-muted">
                    Ravioles, capeletis, sorrentinos y más, con rellenos caseros
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4} className="mb-4">
              <Card className="product-card h-100 shadow-sm">
                <Card.Body className="text-center">
                  <div className="product-icon mb-3">🥟</div>
                  <Card.Title>Pastas Frescas</Card.Title>
                  <Card.Text className="text-muted">
                    Tallarines, fideos, ñoquis elaborados diariamente
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4} className="mb-4">
              <Card className="product-card h-100 shadow-sm">
                <Card.Body className="text-center">
                  <div className="product-icon mb-3">🍅</div>
                  <Card.Title>Salsas Caseras</Card.Title>
                  <Card.Text className="text-muted">
                    Bolognesa, fileto, mixta y más sabores únicos
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col className="text-center">
              <Button 
                as={Link} 
                to="/productos" 
                variant="danger" 
                size="lg"
              >
                Ver Todos los Productos
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="cta-section py-5">
        <Container>
          <Row>
            <Col lg={12} className="text-center text-white">
              <h2 className="mb-4">¿Listo para probar nuestras pastas?</h2>
              <p className="lead mb-4">
                Visitanos en nuestro local o explorá nuestro catálogo completo
              </p>
              <Button 
                as={Link} 
                to="/productos" 
                variant="light" 
                size="lg"
                className="me-3"
              >
                Ver Productos
              </Button>
              <Button 
                as={Link} 
                to="/login" 
                variant="outline-light" 
                size="lg"
              >
                Registrarse
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Home;
