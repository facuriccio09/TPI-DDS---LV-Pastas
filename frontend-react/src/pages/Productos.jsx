import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Spinner, Alert, Pagination } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import { getPublicaciones } from '../services/publicacionService';
import { getCategorias } from '../services/categoriaService';
import './Productos.css';

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paginacion, setPaginacion] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0,
    pageSize: 9
  });
  const [filtros, setFiltros] = useState({
    categoria: '',
    destacado: '',
    disponible: 'true'
  });

  useEffect(() => {
    cargarCategorias();
  }, []);

  useEffect(() => {
    cargarProductos();
  }, [filtros, paginacion.currentPage]);

  const cargarCategorias = async () => {
    try {
      const data = await getCategorias({ activo: true });
      setCategorias(data);
    } catch (err) {
      console.error('Error al cargar categorías:', err);
    }
  };

  const cargarProductos = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Filtrar parámetros vacíos
      const params = {
        page: paginacion.currentPage,
        limit: paginacion.pageSize
      };
      if (filtros.categoria) params.categoria = filtros.categoria;
      if (filtros.destacado) params.destacado = filtros.destacado;
      if (filtros.disponible) params.disponible = filtros.disponible;

      const data = await getPublicaciones(params);
      setProductos(data.publicaciones || []);
      setPaginacion(prev => ({
        ...prev,
        totalPages: data.totalPages || 1,
        total: data.total || 0
      }));
    } catch (err) {
      setError('Error al cargar los productos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros(prev => ({
      ...prev,
      [name]: value
    }));
    // Resetear a la página 1 cuando cambian los filtros
    setPaginacion(prev => ({ ...prev, currentPage: 1 }));
  };

  const limpiarFiltros = () => {
    setFiltros({
      categoria: '',
      destacado: '',
      disponible: 'true'
    });
    // Resetear a la página 1
    setPaginacion(prev => ({ ...prev, currentPage: 1 }));
  };

  const handlePageChange = (pageNumber) => {
    setPaginacion(prev => ({ ...prev, currentPage: pageNumber }));
    // Scroll suave hacia arriba
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="productos-page">
      <div className="productos-hero">
        <Container>
          <h1 className="productos-title">Nuestros Productos</h1>
          <p className="productos-subtitle">
            Descubrí nuestra variedad de pastas frescas y salsas artesanales
          </p>
        </Container>
      </div>

      <Container className="py-5">
        {/* Filtros */}
        <Row className="mb-4">
          <Col lg={12}>
            <div className="filtros-container p-4 shadow-sm">
              <Row className="align-items-end">
                <Col md={3} className="mb-3 mb-md-0">
                  <Form.Label className="fw-bold">Categoría</Form.Label>
                  <Form.Select
                    name="categoria"
                    value={filtros.categoria}
                    onChange={handleFiltroChange}
                  >
                    <option value="">Todas</option>
                    {categorias.map((categoria) => (
                      <option key={categoria.id} value={categoria.nombre}>
                        {categoria.nombre}
                      </option>
                    ))}
                  </Form.Select>
                </Col>

                <Col md={3} className="mb-3 mb-md-0">
                  <Form.Label className="fw-bold">Destacados</Form.Label>
                  <Form.Select
                    name="destacado"
                    value={filtros.destacado}
                    onChange={handleFiltroChange}
                  >
                    <option value="">Todos</option>
                    <option value="true">Solo destacados</option>
                  </Form.Select>
                </Col>

                <Col md={3} className="mb-3 mb-md-0">
                  <Form.Label className="fw-bold">Disponibilidad</Form.Label>
                  <Form.Select
                    name="disponible"
                    value={filtros.disponible}
                    onChange={handleFiltroChange}
                  >
                    <option value="">Todos</option>
                    <option value="true">Disponibles</option>
                    <option value="false">No disponibles</option>
                  </Form.Select>
                </Col>

                <Col md={3}>
                  <button 
                    className="btn btn-outline-secondary w-100"
                    onClick={limpiarFiltros}
                  >
                    Limpiar filtros
                  </button>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        {/* Productos */}
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="success" />
            <p className="mt-3 text-muted">Cargando productos...</p>
          </div>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : productos.length === 0 ? (
          <div className="empty-products-container text-center py-5">
            <div className="empty-products-icon mb-4">
              <svg 
                width="120" 
                height="120" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                className="text-muted"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h3 className="mb-3">No se encontraron productos</h3>
            <p className="text-muted mb-4">
              No hay productos que coincidan con los filtros seleccionados.
              <br />
              Intenta ajustar los filtros o limpia la búsqueda.
            </p>
            <button 
              className="btn btn-success"
              onClick={limpiarFiltros}
            >
              Limpiar todos los filtros
            </button>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <h5 className="text-muted">
                Se encontraron <strong>{paginacion.total}</strong> productos
                {paginacion.totalPages > 1 && (
                  <span> - Página {paginacion.currentPage} de {paginacion.totalPages}</span>
                )}
              </h5>
            </div>
            
            <Row>
              {productos.map(producto => (
                <Col key={producto.id} lg={4} md={6} className="mb-4">
                  <ProductCard producto={producto} />
                </Col>
              ))}
            </Row>

            {/* Paginación */}
            {paginacion.totalPages > 1 && (
              <div className="d-flex justify-content-center mt-5">
                <Pagination>
                  <Pagination.First 
                    onClick={() => handlePageChange(1)}
                    disabled={paginacion.currentPage === 1}
                  />
                  <Pagination.Prev 
                    onClick={() => handlePageChange(paginacion.currentPage - 1)}
                    disabled={paginacion.currentPage === 1}
                  />
                  
                  {[...Array(paginacion.totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    // Mostrar solo páginas cercanas a la actual
                    if (
                      pageNumber === 1 ||
                      pageNumber === paginacion.totalPages ||
                      (pageNumber >= paginacion.currentPage - 2 && pageNumber <= paginacion.currentPage + 2)
                    ) {
                      return (
                        <Pagination.Item
                          key={pageNumber}
                          active={pageNumber === paginacion.currentPage}
                          onClick={() => handlePageChange(pageNumber)}
                        >
                          {pageNumber}
                        </Pagination.Item>
                      );
                    } else if (
                      pageNumber === paginacion.currentPage - 3 ||
                      pageNumber === paginacion.currentPage + 3
                    ) {
                      return <Pagination.Ellipsis key={pageNumber} disabled />;
                    }
                    return null;
                  })}

                  <Pagination.Next 
                    onClick={() => handlePageChange(paginacion.currentPage + 1)}
                    disabled={paginacion.currentPage === paginacion.totalPages}
                  />
                  <Pagination.Last 
                    onClick={() => handlePageChange(paginacion.totalPages)}
                    disabled={paginacion.currentPage === paginacion.totalPages}
                  />
                </Pagination>
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default Productos;
