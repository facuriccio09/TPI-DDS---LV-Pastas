import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Badge, Spinner, Alert, Card } from 'react-bootstrap';
import { getPublicacionById } from '../services/publicacionService';
import { getComentariosByPublicacion } from '../services/comentarioService';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarProducto();
    cargarComentarios();
  }, [id]);

  const cargarProducto = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPublicacionById(id);
      setProducto(data);
    } catch (err) {
      setError('Error al cargar el producto');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const cargarComentarios = async () => {
    try {
      const data = await getComentariosByPublicacion(id);
      setComentarios(data);
    } catch (err) {
      console.error('Error al cargar comentarios:', err);
    }
  };

  const calcularPromedioCalificacion = () => {
    if (comentarios.length === 0) return 0;
    const suma = comentarios.reduce((acc, com) => acc + com.calificacion, 0);
    return (suma / comentarios.length).toFixed(1);
  };

  const renderEstrellas = (calificacion) => {
    const estrellas = [];
    for (let i = 1; i <= 5; i++) {
      estrellas.push(
        <span key={i} className={i <= calificacion ? 'star filled' : 'star'}>
          ★
        </span>
      );
    }
    return estrellas;
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="success" />
        <p className="mt-3">Cargando producto...</p>
      </Container>
    );
  }

  if (error || !producto) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error || 'Producto no encontrado'}</Alert>
      </Container>
    );
  }

  const promedio = calcularPromedioCalificacion();

  return (
    <div className="product-detail-page">
      {/* Header del producto */}
      <div className="product-header">
        <Container>
          <button className="btn-back" onClick={() => navigate('/productos')}>
            ← Volver a productos
          </button>
        </Container>
      </div>

      <Container className="py-5">
        <Row>
          {/* Imagen del producto */}
          <Col lg={6} className="mb-4">
            <div className="product-image-container">
              <img 
                src={producto.imagen} 
                alt={producto.nombre}
                className="product-image"
              />
              {producto.destacado && (
                <Badge bg="warning" text="dark" className="badge-destacado">
                  ⭐ Destacado
                </Badge>
              )}
              {!producto.disponible && (
                <Badge bg="danger" className="badge-no-disponible">
                  No disponible
                </Badge>
              )}
            </div>
          </Col>

          {/* Información del producto */}
          <Col lg={6}>
            <div className="product-info">
              <h1 className="product-name">{producto.nombre}</h1>
              
              {producto.categoriaInfo && (
                <Badge bg="success" className="mb-3 category-badge">
                  {producto.categoriaInfo.nombre}
                </Badge>
              )}

              {/* Calificación */}
              <div className="rating-section mb-3">
                <div className="stars-large">
                  {renderEstrellas(Math.round(promedio))}
                </div>
                <span className="rating-text">
                  {promedio} / 5.0 ({comentarios.length} {comentarios.length === 1 ? 'reseña' : 'reseñas'})
                </span>
              </div>

              <div className="product-price">
                ${producto.precio.toLocaleString('es-AR')}
              </div>

              <div className="product-description">
                <h5>Descripción</h5>
                <p>{producto.descripcion}</p>
              </div>

              {producto.ingredientes && (
                <div className="product-ingredients">
                  <h5>Ingredientes</h5>
                  <p>{producto.ingredientes}</p>
                </div>
              )}

              {producto.variantes && producto.variantes.length > 0 && (
                <div className="product-variants">
                  <h5>Variantes disponibles</h5>
                  <ul>
                    {producto.variantes.map((variante, index) => (
                      <li key={index}>{variante}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Ingredientes asociados */}
              {producto.ingredientesDetalle && producto.ingredientesDetalle.length > 0 && (
                <div className="product-ingredients-list">
                  <h5>Ingredientes detallados</h5>
                  <div className="ingredients-tags">
                    {producto.ingredientesDetalle.map((ing) => (
                      <Badge 
                        key={ing.id} 
                        bg={ing.esAlergeno ? 'danger' : 'secondary'}
                        className="ingredient-tag"
                      >
                        {ing.nombre}
                        {ing.esAlergeno && ' ⚠️'}
                        {ing.PublicacionIngrediente?.cantidad && ` (${ing.PublicacionIngrediente.cantidad})`}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Col>
        </Row>

        {/* Sección de reseñas */}
        <Row className="mt-5">
          <Col lg={12}>
            <div className="reviews-section">
              <h3 className="reviews-title">
                Reseñas de clientes ({comentarios.length})
              </h3>

              {comentarios.length === 0 ? (
                <Alert variant="info">
                  Aún no hay reseñas para este producto. ¡Sé el primero en dejar una!
                </Alert>
              ) : (
                <div className="reviews-list">
                  {comentarios.map((comentario) => (
                    <Card key={comentario.id} className="review-card mb-3">
                      <Card.Body>
                        <div className="review-header">
                          <div>
                            <strong className="review-author">
                              {comentario.usuario?.nombre || 'Usuario'}
                            </strong>
                            <div className="review-stars">
                              {renderEstrellas(comentario.calificacion)}
                            </div>
                          </div>
                          <small className="review-date text-muted">
                            {new Date(comentario.createdAt).toLocaleDateString('es-AR', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </small>
                        </div>
                        <p className="review-text mt-3">{comentario.texto}</p>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductDetail;
