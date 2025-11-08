import { useState, useEffect } from 'react';
import { 
  Container, Table, Button, Modal, Form, Alert, Spinner, Badge 
} from 'react-bootstrap';
import { 
  getIngredientes, 
  createIngrediente, 
  updateIngrediente, 
  deleteIngrediente 
} from '../services/ingredienteService';

const AdminIngredientes = () => {
  const [ingredientes, setIngredientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [ingredienteSeleccionado, setIngredienteSeleccionado] = useState(null);
  
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    esAlergeno: false
  });

  useEffect(() => {
    cargarIngredientes();
  }, []);

  const cargarIngredientes = async () => {
    try {
      setLoading(true);
      const data = await getIngredientes();
      setIngredientes(data.ingredientes || []);
      setError(null);
    } catch (err) {
      setError(err.toString());
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (mode, ingrediente = null) => {
    setModalMode(mode);
    setIngredienteSeleccionado(ingrediente);
    
    if (mode === 'edit' && ingrediente) {
      setFormData({
        nombre: ingrediente.nombre || '',
        descripcion: ingrediente.descripcion || '',
        esAlergeno: ingrediente.esAlergeno || false
      });
    } else {
      setFormData({
        nombre: '',
        descripcion: '',
        esAlergeno: false
      });
    }
    
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setIngredienteSeleccionado(null);
    setFormData({ nombre: '', descripcion: '', esAlergeno: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (modalMode === 'create') {
        await createIngrediente(formData);
      } else {
        await updateIngrediente(ingredienteSeleccionado.id, formData);
      }
      await cargarIngredientes();
      handleCloseModal();
    } catch (err) {
      setError(err.toString());
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este ingrediente?')) {
      return;
    }

    try {
      await deleteIngrediente(id);
      await cargarIngredientes();
    } catch (err) {
      setError(err.toString());
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="success" />
        <p className="mt-3">Cargando ingredientes...</p>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Gestión de Ingredientes</h2>
        <Button variant="success" onClick={() => handleOpenModal('create')}>
          + Nuevo Ingrediente
        </Button>
      </div>

      {error && <Alert variant="danger" dismissible onClose={() => setError(null)}>{error}</Alert>}

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Alérgeno</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ingredientes.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">No hay ingredientes</td>
            </tr>
          ) : (
            ingredientes.map((ing) => (
              <tr key={ing.id}>
                <td>{ing.id}</td>
                <td>{ing.nombre}</td>
                <td>{ing.descripcion || '-'}</td>
                <td>
                  <Badge bg={ing.esAlergeno ? 'warning' : 'secondary'}>
                    {ing.esAlergeno ? 'Sí' : 'No'}
                  </Badge>
                </td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-1 mb-1"
                    onClick={() => handleOpenModal('edit', ing)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    className="mb-1"
                    onClick={() => handleDelete(ing.id)}
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
            {modalMode === 'create' ? 'Nuevo Ingrediente' : 'Editar Ingrediente'}
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
                label="Es alérgeno"
                checked={formData.esAlergeno}
                onChange={(e) => setFormData({ ...formData, esAlergeno: e.target.checked })}
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

export default AdminIngredientes;
