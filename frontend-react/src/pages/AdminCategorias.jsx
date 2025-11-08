import { useState, useEffect } from 'react';
import { 
  Container, Table, Button, Modal, Form, Alert, Spinner, Badge 
} from 'react-bootstrap';
import { 
  getCategorias, 
  createCategoria, 
  updateCategoria, 
  deleteCategoria,
  toggleCategoria 
} from '../services/categoriaService';

const AdminCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    activo: true
  });

  useEffect(() => {
    cargarCategorias();
  }, []);

  const cargarCategorias = async () => {
    try {
      setLoading(true);
      const data = await getCategorias();
      setCategorias(data || []);
      setError(null);
    } catch (err) {
      setError(err.toString());
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (mode, categoria = null) => {
    setModalMode(mode);
    setCategoriaSeleccionada(categoria);
    
    if (mode === 'edit' && categoria) {
      setFormData({
        nombre: categoria.nombre || '',
        descripcion: categoria.descripcion || '',
        activo: categoria.activo !== false
      });
    } else {
      setFormData({
        nombre: '',
        descripcion: '',
        activo: true
      });
    }
    
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCategoriaSeleccionada(null);
    setFormData({ nombre: '', descripcion: '', activo: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (modalMode === 'create') {
        await createCategoria(formData);
      } else {
        await updateCategoria(categoriaSeleccionada.id, formData);
      }
      await cargarCategorias();
      handleCloseModal();
    } catch (err) {
      setError(err.toString());
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta categoría?')) {
      return;
    }

    try {
      await deleteCategoria(id);
      await cargarCategorias();
    } catch (err) {
      setError(err.toString());
    }
  };

  const handleToggle = async (id) => {
    try {
      await toggleCategoria(id);
      await cargarCategorias();
    } catch (err) {
      setError(err.toString());
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="success" />
        <p className="mt-3">Cargando categorías...</p>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Gestión de Categorías</h2>
        <Button variant="success" onClick={() => handleOpenModal('create')}>
          + Nueva Categoría
        </Button>
      </div>

      {error && <Alert variant="danger" dismissible onClose={() => setError(null)}>{error}</Alert>}

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">No hay categorías</td>
            </tr>
          ) : (
            categorias.map((cat) => (
              <tr key={cat.id}>
                <td>{cat.id}</td>
                <td>{cat.nombre}</td>
                <td>{cat.descripcion || '-'}</td>
                <td>
                  <Badge bg={cat.activo ? 'success' : 'secondary'}>
                    {cat.activo ? 'Activa' : 'Inactiva'}
                  </Badge>
                </td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-1 mb-1"
                    onClick={() => handleOpenModal('edit', cat)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant={cat.activo ? 'secondary' : 'success'}
                    size="sm"
                    className="me-1 mb-1"
                    onClick={() => handleToggle(cat.id)}
                  >
                    {cat.activo ? 'Desactivar' : 'Activar'}
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    className="mb-1"
                    onClick={() => handleDelete(cat.id)}
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
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalMode === 'create' ? 'Nueva Categoría' : 'Editar Categoría'}
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
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Activa"
                checked={formData.activo}
                onChange={(e) => setFormData({ ...formData, activo: e.target.checked })}
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

export default AdminCategorias;
