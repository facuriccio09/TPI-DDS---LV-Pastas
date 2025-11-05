import { Link, NavLink } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav, Container, Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import logo from '../media/Logo La Vesubiana.png';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <BootstrapNavbar bg="light" expand="lg" sticky="top" className="shadow-sm navbar-custom">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/" className="d-flex align-items-center brand-container">
          <div className="logo-wrapper">
            <img
              src={logo}
              height="70"
              width="auto"
              className="d-inline-block align-top logo-img"
              alt="La Vesubiana Logo"
            />
          </div>
          <span className="brand-text">La Vesubiana</span>
        </BootstrapNavbar.Brand>
        
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={NavLink} to="/" className="nav-link-custom">
              Inicio
            </Nav.Link>
            
            <Nav.Link as={NavLink} to="/productos" className="nav-link-custom">
              Productos
            </Nav.Link>

            {user ? (
              <>
                <Nav.Link as={NavLink} to="/perfil" className="nav-link-custom">
                  Mi Perfil
                </Nav.Link>
                
                {user.rol === 'admin' && (
                  <Nav.Link as={NavLink} to="/admin" className="nav-link-custom">
                    Admin
                  </Nav.Link>
                )}
                
                <Button 
                  variant="outline-danger" 
                  size="sm" 
                  onClick={logout}
                  className="ms-2"
                >
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <Button 
                as={Link} 
                to="/login" 
                variant="danger" 
                size="sm"
                className="ms-2 btn-iniciar-sesion"
              >
                Iniciar Sesión
              </Button>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
