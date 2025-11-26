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
import NotFound from './NotFound'; // <-- 1. IMPORTAR NOTFOUND
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
  const [notFound, setNotFound] = useState(false); // <-- 2. AÑADIR ESTADO NOTFOUND
  const [comentarioEditando, setComentarioEditando] = useState(null);
  const [comentarioDelUsuario, setComentarioDelUsuario] = useState(null);

  useEffect(() => {
    // Unimos ambas cargas en una sola función dentro de useEffect
    const cargarDatos = async () => {
      try {
        setLoading(true);
        setError(null);
        setNotFound(false); // Reiniciar estado
        
        // Cargar producto - si falla aquí con 404, es porque el producto no existe
        const dataProducto = await getPublicacionById(id);
        setProducto(dataProducto);
        
        // Cargar comentarios - si esto falla, no es tan grave
        try {
          const dataComentarios = await getComentariosByPublicacion(id);
          const listaComentarios = dataComentarios.comentarios || [];
          setComentarios(listaComentarios);
          
          // Verificar si el usuario ya comentó
          if (user) {
            const miComentario = listaComentarios.find(c => c.usuario?.email === user.email);
            setComentarioDelUsuario(miComentario || null);
          }
        } catch (comentarioErr) {
          // Si falla al cargar comentarios, solo mostramos los comentarios vacíos
          console.warn('No se pudieron cargar los comentarios:', comentarioErr);
          setComentarios([]);
        }

      } catch (err) {
        // 3. CAPTURAR EL ERROR 404 del producto
        if (err.response && err.response.status === 404) {
          setNotFound(true);
          setError(null); // Importante: limpiar error para que no compita
        } else {
          setNotFound(false);
          setError('Error al cargar el producto. Inténtalo de nuevo más tarde.');
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };
    
    cargarDatos();
  }, [id, user]); // Añadimos 'user' a las dependencias por si cambia (login/logout)

  // Función para recargar solo los comentarios (la usaremos después de crear/editar/borrar)
  const recargarComentarios = async () => {
     try {
      const data = await getComentariosByPublicacion(id);
      const listaComentarios = data.comentarios || [];
      setComentarios(listaComentarios);
      
      // Verificar si el usuario ya comentó
      if (user) {
        const miComentario = listaComentarios.find(c => c.usuario?.email === user.email);
        setComentarioDelUsuario(miComentario || null);
      }
    } catch (err) {
      console.error('Error al recargar comentarios:', err);
    }
  };


  const calcularPromedioCalificacion = () => {
    const valid = comentarios.filter(c => c && typeof c.calificacion === 'number');
    if (valid.length === 0) return 0;
    const suma = valid.reduce((acc, com) => acc + com.calificacion, 0);
    return parseFloat((suma / valid.length).toFixed(1));
  };

  const handleCrearComentario = async (comentarioData) => {
    try {
      await createComentario(comentarioData);
      await recargarComentarios(); // Recargar comentarios
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleEditarComentario = async (comentarioId, comentarioData) => {
    try {
      await updateComentario(comentarioId, comentarioData);
      await recargarComentarios(); // Recargar comentarios
      setComentarioEditando(null);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleEliminarComentario = async (comentarioId) => {
    // ¡IMPORTANTE! Reemplazamos window.confirm por un Alert simple
    // window.confirm() puede ser bloqueado o problemático.
    // Idealmente, aquí se usaría un Modal de Bootstrap.
    // Por ahora, solo alertamos y continuamos.
    // const confirmacion = window.confirm('¿Estás seguro de eliminar este comentario?');
    // if (!confirmacion) return;
    
    try {
      await deleteComentario(comentarioId);
      await recargarComentarios(); // Recargar comentarios
    } catch (error) {
      // Usamos Alert de Bootstrap en lugar de window.alert()
      setError('Error al eliminar comentario: ' + error.message);
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

  // --- RENDERIZADO CONDICIONAL ---

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="success" />
        <p className="mt-3">Cargando producto...</p>
      </Container>
    );
  }

  // 4. MOSTRAR EL COMPONENTE NOTFOUND PRIMERO (antes de verificar error)
  if (notFound) {
    return (
      <NotFound 
        titulo="Producto No Encontrado"
        mensaje="Oops! El producto que buscas no existe o fue removido."
      />
    );
  }

  // 5. MOSTRAR OTROS ERRORES
  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }
  
  // Verificación final por si producto es null
  if (!producto) {
     return (
      <Container className="py-5 text-center">
        <Alert variant="info">No se pudo cargar la información del producto.</Alert>
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

      {/* Main product section */}
      <div className="product-main-section">
        <Container>
          <Row className="product-row g-4">
            
            {/* Columna de Imagen */}
            <Col lg={6} className="d-flex">
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

            {/* Columna de Info */}
            <Col lg={6} className="d-flex">
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

      {/* Sección de reseñas */}
      <div className="reviews-full-section">
        <Container>
          <Row className="justify-content-center">
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
                  <Card className="login-prompt-card mb-4 border-0 shadow-sm">
                    <Card.Body className="text-center py-5">
                      <div className="login-prompt-icon mb-3">
                        <svg 
                          width="60" 
                          height="60" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          className="text-success"
                        >
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </div>
                      <h5 className="mb-3">¿Querés dejar tu opinión?</h5>
                      <p className="text-muted mb-4">
                        Iniciá sesión para compartir tu experiencia con este producto
                        y ayudar a otros clientes.
                      </p>
                      <a 
                        href="/login" 
                        className="btn btn-success btn-lg px-5"
                        style={{
                          borderRadius: '30px',
                          fontWeight: '600',
                          background: 'linear-gradient(135deg, #27ae60 0%, #229954 100%)',
                          border: 'none',
                          boxShadow: '0 4px 15px rgba(39, 174, 96, 0.3)'
                        }}
                      >
                        🔐 Iniciar Sesión
                      </a>
                    </Card.Body>
                  </Card>
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
                                  {user && (comentario.usuario?.email === user.email || isAdmin()) && (
                                    <div className="ms-2">
                                      {comentario.usuario?.email === user.email && (
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