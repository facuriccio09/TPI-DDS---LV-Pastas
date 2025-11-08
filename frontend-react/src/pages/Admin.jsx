import { useState, useEffect } from 'react';
import { Container, Table, Spinner, Alert, Badge, Button, Modal, Form } from 'react-bootstrap';
import { getUsuarios, updateUsuario, deleteUsuario, activarUsuario } from '../services/usuarioService';

const Admin = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedUsuario, setSelectedUsuario] = useState(null);
  const [formData, setFormData] = useState({ nombre: '', email: '', rol: '' });

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      setLoading(true);
      const data = await getUsuarios();
      setUsuarios(data.usuarios);
      setError(null);
    } catch (err) {
      setError(err.toString());
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (usuario) => {
    setSelectedUsuario(usuario);
    setFormData({
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUsuario(null);
    setFormData({ nombre: '', email: '', rol: '' });
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      await updateUsuario(selectedUsuario.id, formData);
      await cargarUsuarios();
      handleCloseModal();
    } catch (err) {
      setError(err.toString());
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de desactivar este usuario?')) {
      try {
        await deleteUsuario(id);
        await cargarUsuarios();
      } catch (err) {
        setError(err.toString());
      }
    }
  };

  const handleActivar = async (id) => {
    try {
      await activarUsuario(id);
      await cargarUsuarios();
    } catch (err) {
      setError(err.toString());
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="success" />
        <p className="mt-3">Cargando usuarios...</p>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h2 className="mb-4">Panel de Administración - Usuarios</h2>
      
      {error && <Alert variant="danger" dismissible onClose={() => setError(null)}>{error}</Alert>}

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Fecha Registro</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.email}</td>
              <td>
                <Badge bg={usuario.rol === 'admin' ? 'danger' : 'primary'}>
                  {usuario.rol}
                </Badge>
              </td>
              <td>
                <Badge bg={usuario.activo ? 'success' : 'secondary'}>
                  {usuario.activo ? 'Activo' : 'Inactivo'}
                </Badge>
              </td>
              <td>
                {new Date(usuario.createdAt).toLocaleDateString('es-ES')}
              </td>
              <td>
                <Button 
                  variant="warning" 
                  size="sm" 
                  className="me-2"
                  onClick={() => handleEdit(usuario)}
                >
                  Editar
                </Button>
                {usuario.activo ? (
                  <Button 
                    variant="danger" 
                    size="sm"
                    onClick={() => handleDelete(usuario.id)}
                  >
                    Desactivar
                  </Button>
                ) : (
                  <Button 
                    variant="success" 
                    size="sm"
                    onClick={() => handleActivar(usuario.id)}
                  >
                    Activar
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal de edición */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitEdit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Rol</Form.Label>
              <Form.Select
                value={formData.rol}
                onChange={(e) => setFormData({ ...formData, rol: e.target.value })}
                required
              >
                <option value="usuario">Usuario</option>
                <option value="admin">Administrador</option>
              </Form.Select>
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit">
                Guardar Cambios
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Admin;
