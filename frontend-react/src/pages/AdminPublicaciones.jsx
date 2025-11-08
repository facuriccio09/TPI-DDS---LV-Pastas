import { useState, useEffect } from 'react';
import { 
  Container, Table, Button, Modal, Form, Alert, Spinner, Badge 
} from 'react-bootstrap';
import { 
  getPublicaciones, 
  createPublicacion, 
  updatePublicacion, 
  deletePublicacion,
  toggleDisponibilidad 
} from '../services/publicacionService';
import { getCategorias } from '../services/categoriaService';

const AdminPublicaciones = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' | 'edit'
  const [publicacionSeleccionada, setPublicacionSeleccionada] = useState(null);
  
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    ingredientes: '',
    variantes: '',
    imagen: '',
    categoria: '',
    disponible: true,
    destacado: false
  });

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      const [pubData, catData] = await Promise.all([
        getPublicaciones(),
        getCategorias()
      ]);
      setPublicaciones(pubData.publicaciones || []);
      setCategorias(catData || []);
      setError(null);
    } catch (err) {
      setError(err.toString());
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (mode, publicacion = null) => {
    setModalMode(mode);
    setPublicacionSeleccionada(publicacion);
    
    if (mode === 'edit' && publicacion) {
      setFormData({
        nombre: publicacion.nombre || '',
        descripcion: publicacion.descripcion || '',
        precio: publicacion.precio || '',
        ingredientes: publicacion.ingredientes || '',
        variantes: Array.isArray(publicacion.variantes) 
          ? publicacion.variantes.join(', ') 
          : '',
        imagen: publicacion.imagen || '',
        categoria: publicacion.categoria || '',
        disponible: publicacion.disponible !== false,
        destacado: publicacion.destacado || false
      });
    } else {
      setFormData({
        nombre: '',
        descripcion: '',
        precio: '',
        ingredientes: '',
        variantes: '',
        imagen: '',
        categoria: '',
        disponible: true,
        destacado: false
      });
    }
    
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setPublicacionSeleccionada(null);
    setFormData({
      nombre: '',
      descripcion: '',
      precio: '',
      ingredientes: '',
      variantes: '',
      imagen: '',
      categoria: '',
      disponible: true,
      destacado: false
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const dataToSend = {
        ...formData,
        precio: parseFloat(formData.precio),
        variantes: formData.variantes 
          ? formData.variantes.split(',').map(v => v.trim()).filter(v => v)
          : []
      };

      if (modalMode === 'create') {
        await createPublicacion(dataToSend);
      } else {
        await updatePublicacion(publicacionSeleccionada.id, dataToSend);
      }

      await cargarDatos();
      handleCloseModal();
    } catch (err) {
      setError(err.toString());
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta publicación?')) {
      return;
    }

    try {
      await deletePublicacion(id);
      await cargarDatos();
    } catch (err) {
      setError(err.toString());
    }
  };

  const handleToggleDisponibilidad = async (id, disponibleActual) => {
    try {
      await toggleDisponibilidad(id, !disponibleActual);
      await cargarDatos();
    } catch (err) {
      setError(err.toString());
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="success" />
        <p className="mt-3">Cargando publicaciones...</p>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Gestión de Publicaciones</h2>
        <Button variant="success" onClick={() => handleOpenModal('create')}>
          + Nueva Publicación
        </Button>
      </div>

      {error && <Alert variant="danger" dismissible onClose={() => setError(null)}>{error}</Alert>}

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Disponible</th>
            <th>Destacado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {publicaciones.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">No hay publicaciones</td>
            </tr>
          ) : (
            publicaciones.map((pub) => (
              <tr key={pub.id}>
                <td>{pub.id}</td>
                <td>{pub.nombre}</td>
                <td>{pub.categoria}</td>
                <td>${pub.precio?.toLocaleString('es-AR')}</td>
                <td>
                  <Badge bg={pub.disponible ? 'success' : 'secondary'}>
                    {pub.disponible ? 'Sí' : 'No'}
                  </Badge>
                </td>
                <td>
                  <Badge bg={pub.destacado ? 'warning' : 'secondary'}>
                    {pub.destacado ? 'Sí' : 'No'}
                  </Badge>
                </td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-1 mb-1"
                    onClick={() => handleOpenModal('edit', pub)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant={pub.disponible ? 'secondary' : 'success'}
                    size="sm"
                    className="me-1 mb-1"
                    onClick={() => handleToggleDisponibilidad(pub.id, pub.disponible)}
                  >
                    {pub.disponible ? 'Desactivar' : 'Activar'}
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    className="mb-1"
                    onClick={() => handleDelete(pub.id)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* Modal de Crear/Editar */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {modalMode === 'create' ? 'Nueva Publicación' : 'Editar Publicación'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre *</Form.Label>
              <Form.Control
                type="text"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descripción *</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Precio *</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                value={formData.precio}
                onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Ingredientes *</Form.Label>
              <Form.Control
                type="text"
                value={formData.ingredientes}
                onChange={(e) => setFormData({ ...formData, ingredientes: e.target.value })}
                placeholder="Ej: Harina, Huevos, Ricota"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Variantes (separadas por coma)</Form.Label>
              <Form.Control
                type="text"
                value={formData.variantes}
                onChange={(e) => setFormData({ ...formData, variantes: e.target.value })}
                placeholder="Ej: Pollo, Carne, Jamón y queso"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Categoría</Form.Label>
              <Form.Control
                type="text"
                value={formData.categoria}
                onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                placeholder="Ej: Pastas Rellenas"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>URL de Imagen</Form.Label>
              <Form.Control
                type="text"
                value={formData.imagen}
                onChange={(e) => setFormData({ ...formData, imagen: e.target.value })}
                placeholder="https://..."
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Disponible"
                checked={formData.disponible}
                onChange={(e) => setFormData({ ...formData, disponible: e.target.checked })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Destacado"
                checked={formData.destacado}
                onChange={(e) => setFormData({ ...formData, destacado: e.target.checked })}
              />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit">
                {modalMode === 'create' ? 'Crear' : 'Guardar Cambios'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AdminPublicaciones;
