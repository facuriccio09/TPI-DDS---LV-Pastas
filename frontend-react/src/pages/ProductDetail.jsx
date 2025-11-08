import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Badge, Spinner, Alert, Card, Button } from 'react-bootstrap';
import { getPublicacionById } from '../services/publicacionService';
import { 
  getComentariosByPublicacion, 
  createComentario, 
  updateComentario, 
  deleteComentario 
} from '../services/comentarioService';
import { useAuth } from '../context/AuthContext';
import ComentarioForm from '../components/ComentarioForm';
import './ProductDetail.css';

const ProductDetail = () => {
  const PLACEHOLDER_IMAGE = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'><rect width='100%' height='100%' fill='%23f8f9fa'/><text x='50%' y='50%' fill='%23999' font-size='24' dominant-baseline='middle' text-anchor='middle'>Sin imagen</text></svg>";
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const [producto, setProducto] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comentarioEditando, setComentarioEditando] = useState(null);
  const [comentarioDelUsuario, setComentarioDelUsuario] = useState(null);

  useEffect(() => {
    cargarProducto();
    cargarComentarios();
  }, [id]);

  const cargarProducto = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPublicacionById(id);
      console.log('getPublicacionById response:', data);
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
      console.log('getComentariosByPublicacion response:', data);
      // data tiene { total, calificacionPromedio, comentarios }
      const listaComentarios = data.comentarios || [];
      setComentarios(listaComentarios);
      
      // Verificar si el usuario ya comentó
      if (user) {
        const miComentario = listaComentarios.find(c => c.usuarioId === user.id);
        setComentarioDelUsuario(miComentario || null);
      }
    } catch (err) {
      console.error('Error al cargar comentarios:', err);
    }
  };

  const calcularPromedioCalificacion = () => {
    const valid = comentarios.filter(c => c && typeof c.calificacion === 'number');
    if (valid.length === 0) return 0;
    const suma = valid.reduce((acc, com) => acc + com.calificacion, 0);
    // devolver número (no string) para que Math.round y otras operaciones funcionen correctamente
    return parseFloat((suma / valid.length).toFixed(1));
  };

  const handleCrearComentario = async (comentarioData) => {
    try {
      await createComentario(comentarioData);
      await cargarComentarios(); // Recargar comentarios
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleEditarComentario = async (comentarioId, comentarioData) => {
    try {
      await updateComentario(comentarioId, comentarioData);
      await cargarComentarios(); // Recargar comentarios
      setComentarioEditando(null);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleEliminarComentario = async (comentarioId) => {
    if (!window.confirm('¿Estás seguro de eliminar este comentario?')) {
      return;
    }
    
    try {
      await deleteComentario(comentarioId);
      await cargarComentarios(); // Recargar comentarios
    } catch (error) {
      alert('Error al eliminar comentario: ' + error);
    }
  };

  const handleCancelarEdicion = () => {
    setComentarioEditando(null);
  };

  const formatFecha = (dateString) => {
    if (!dateString) return 'Fecha no disponible';
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return 'Fecha no disponible';
    return d.toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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

      {/* Main product section - full width */}
      <div className="product-main-section">
        <Container>
          {/* CAMBIO: Se reemplazó g-0 por g-4 para que Bootstrap maneje el espaciado (gap) 
            entre las columnas/tarjetas.
          */}
          <Row className="product-row g-4">
            
            {/* CAMBIO: Se añadió d-flex para que el contenido (la tarjeta) 
              pueda estirarse al 100% de la altura de la columna.
            */}
            <Col lg={6} className="d-flex">
              {/* CAMBIO: Se renombró la clase para estilizarla como una tarjeta */}
              <div className="product-image-card">
                <img
                  src={producto.imagen || PLACEHOLDER_IMAGE}
                  alt={producto.nombre || 'Producto'}
                  className="product-image"
                />
                {!producto.disponible && (
                  <Badge bg="danger" className="badge-no-disponible">
                    No disponible
                  </Badge>
                )}
              </div>
            </Col>

          {/* CAMBIO: Se añadió d-flex */}
          <Col lg={6} className="d-flex">
            {/* CAMBIO: Se renombró la clase para estilizarla como una tarjeta */}
            <div className="product-info-card">
              {producto.destacado && (
                <Badge bg="warning" text="dark" className="badge-destacado">
                  Destacado
                </Badge>
              )}
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
                ${producto.precio != null ? producto.precio.toLocaleString('es-AR') : '—'}
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
                  <p className="ingredients-simple">
                    {producto.ingredientesDetalle
                      .map((ing) => `${ing.nombre}${ing.PublicacionIngrediente?.cantidad ? ` (${ing.PublicacionIngrediente.cantidad})` : ''}`)
                      .join(', ')}
                  </p>
                </div>
              )}
            </div>
          </Col>
        </Row>
        </Container>
      </div>

      {/* Sección de reseñas - full width */}
      <div className="reviews-full-section">
        <Container>
          <Row className="justify-content-center">
            {/* CAMBIO: Se ajustó el ancho para que coincida con el de las tarjetas de arriba (lg={12}) */}
            <Col lg={12} xl={10}>
              <div className="reviews-section">
                <h3 className="reviews-title">
                  Reseñas de clientes ({comentarios.length})
                </h3>

                {/* Formulario para agregar comentario (solo si el usuario no ha comentado) */}
                {user && !comentarioDelUsuario && !comentarioEditando && (
                  <Card className="mb-4 bg-light">
                    <Card.Body>
                      <h5 className="mb-3">Deja tu reseña</h5>
                      <ComentarioForm
                        publicacionId={id}
                        onComentarioCreado={handleCrearComentario}
                      />
                    </Card.Body>
                  </Card>
                )}

                {/* Mensaje si el usuario no está logueado */}
                {!user && (
                  <Alert variant="info" className="mb-4">
                    <a href="/login" className="alert-link">Inicia sesión</a> para dejar tu reseña.
                  </Alert>
                )}

                {comentarios.length === 0 ? (
                  <Alert variant="info">
                    Aún no hay reseñas para este producto. {user && !comentarioDelUsuario ? '¡Sé el primero en dejar una!' : ''}
                  </Alert>
                ) : (
                  <div className="reviews-list">
                    {comentarios.map((comentario) => (
                      <Card key={comentario.id} className="review-card mb-3">
                        <Card.Body>
                          {/* Si estamos editando este comentario, mostrar formulario */}
                          {comentarioEditando?.id === comentario.id ? (
                            <div>
                              <h5 className="mb-3">Editar comentario</h5>
                              <ComentarioForm
                                publicacionId={id}
                                comentarioExistente={comentarioEditando}
                                onComentarioEditado={handleEditarComentario}
                              />
                              <Button 
                                variant="secondary" 
                                size="sm" 
                                onClick={handleCancelarEdicion}
                                className="mt-2"
                              >
                                Cancelar
                              </Button>
                            </div>
                          ) : (
                            <>
                              <div className="review-header">
                                <div>
                                  <strong className="review-author">
                                    {comentario.usuario?.nombre || 'Usuario'}
                                  </strong>
                                  <div className="review-stars">
                                    {renderEstrellas(comentario.calificacion)}
                                  </div>
                                </div>
                                <div className="d-flex align-items-center gap-2">
                                  <small className="review-date text-muted">
                                    {formatFecha(comentario.createdAt)}
                                  </small>
                                  
                                  {/* Botones de edición/eliminación */}
                                  {user && (comentario.usuarioId === user.id || isAdmin()) && (
                                    <div className="ms-2">
                                      {comentario.usuarioId === user.id && (
                                        <Button
                                          variant="outline-primary"
                                          size="sm"
                                          onClick={() => setComentarioEditando(comentario)}
                                          className="me-1"
                                        >
                                          Editar
                                        </Button>
                                      )}
                                      <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={() => handleEliminarComentario(comentario.id)}
                                      >
                                        Eliminar
                                      </Button>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <p className="review-text mt-3">{comentario.texto}</p>
                            </>
                          )}
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
    </div>
  );
};

export default ProductDetail;