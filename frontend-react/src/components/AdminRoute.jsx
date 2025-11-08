import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Spinner, Container, Alert } from 'react-bootstrap';

/**
 * Componente para proteger rutas que requieren permisos de Administrador.
 */
const AdminRoute = () => {
  const { user, loading, isAdmin } = useAuth();

  // 1. Esperar si el contexto está cargando
  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="success" />
        <p className="mt-3">Verificando permisos...</p>
      </Container>
    );
  }

  // 2. Si no hay usuario, redirigir a /login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 3. Si hay usuario pero NO es admin, mostrar error y redirigir
  if (!isAdmin()) {
    // Redirigimos al inicio
    return <Navigate to="/" replace />;
    
    // Opcionalmente, podrías mostrar un mensaje de "Acceso Denegado"
    /*
    return (
      <Container className="py-5">
        <Alert variant="danger">
          Acceso denegado. No tienes permisos de administrador.
        </Alert>
      </Container>
    );
    */
  }

  // 4. Si es admin, mostrar el contenido de la ruta anidada (ej. /admin)
  return <Outlet />;
};

export default AdminRoute;

// "Envolver" las rutas que solo pueden ver administradores.