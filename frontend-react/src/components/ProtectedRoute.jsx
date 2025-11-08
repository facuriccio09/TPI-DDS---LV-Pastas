import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Spinner, Container } from 'react-bootstrap';

/**
 * Componente para proteger rutas que requieren autenticación.
 * Verifica si el usuario está logueado y si el contexto está cargando.
 */
const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  // 1. Esperar si el contexto está cargando (verificando localStorage)
  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="success" />
        <p className="mt-3">Verificando sesión...</p>
      </Container>
    );
  }

  // 2. Si no está cargando y no hay usuario, redirigir a /login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 3. Si hay usuario, mostrar el contenido de la ruta anidada (ej. /perfil)
  return <Outlet />;
};

export default ProtectedRoute;
// "Envolver" las rutas que solo pueden ver usuarios logueados.