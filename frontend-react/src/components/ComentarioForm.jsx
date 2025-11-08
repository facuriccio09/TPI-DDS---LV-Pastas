import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

const ComentarioForm = ({ publicacionId, onComentarioCreado, comentarioExistente, onComentarioEditado }) => {
  const { user } = useAuth();
  const [texto, setTexto] = useState(comentarioExistente?.texto || '');
  const [calificacion, setCalificacion] = useState(comentarioExistente?.calificacion || 5);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (comentarioExistente) {
        // Editar comentario existente
        await onComentarioEditado(comentarioExistente.id, { texto, calificacion });
      } else {
        // Crear nuevo comentario
        await onComentarioCreado({ texto, calificacion, publicacionId });
      }
      
      if (!comentarioExistente) {
        setTexto('');
        setCalificacion(5);
      }
    } catch (err) {
      setError(err.toString());
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <Alert variant="info">
        <a href="/login">Inicia sesión</a> para dejar tu comentario y calificación.
      </Alert>
    );
  }

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      {error && <Alert variant="danger" dismissible onClose={() => setError(null)}>{error}</Alert>}
      
      <Form.Group className="mb-3">
        <Form.Label>Calificación</Form.Label>
        <Form.Select 
          value={calificacion} 
          onChange={(e) => setCalificacion(parseInt(e.target.value))}
          required
        >
          <option value="5">⭐⭐⭐⭐⭐ (5 estrellas)</option>
          <option value="4">⭐⭐⭐⭐ (4 estrellas)</option>
          <option value="3">⭐⭐⭐ (3 estrellas)</option>
          <option value="2">⭐⭐ (2 estrellas)</option>
          <option value="1">⭐ (1 estrella)</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Tu comentario</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Comparte tu experiencia con este producto..."
          required
        />
      </Form.Group>

      <Button 
        type="submit" 
        variant="success" 
        disabled={loading}
      >
        {loading ? 'Enviando...' : comentarioExistente ? 'Actualizar Comentario' : 'Publicar Comentario'}
      </Button>
    </Form>
  );
};

export default ComentarioForm;
