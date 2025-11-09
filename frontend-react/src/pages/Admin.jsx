import { useState } from 'react';
import { Container, Tab, Tabs } from 'react-bootstrap';
import AdminUsuarios from './AdminUsuarios';
import AdminPublicaciones from './AdminPublicaciones';
import AdminCategorias from './AdminCategorias';
import AdminIngredientes from './AdminIngredientes';
import './Admin.css'; // <-- 1. IMPORTAMOS EL NUEVO CSS

const Admin = () => {
  const [activeTab, setActiveTab] = useState('publicaciones'); // <-- Cambiado a 'publicaciones' como default

  return (
    // 2. AÑADIMOS UN CONTENEDOR GENERAL
    <div className="admin-page-tabs">
      <Container className="py-4">
        <h1 className="admin-title mb-4">Panel de Administración</h1>
        
        <Tabs
          id="admin-tabs"
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="mb-0 admin-tabs" // 3. AÑADIMOS CLASE PARA STYLING
        >
          {/* Recomiendo 'Publicaciones' como primera pestaña */}
          <Tab eventKey="publicaciones" title="Publicaciones">
            <div className="admin-tab-content">
              <AdminPublicaciones />
            </div>
          </Tab>

          <Tab eventKey="categorias" title="Categorías">
            <div className="admin-tab-content">
              <AdminCategorias />
            </div>
          </Tab>
          
          <Tab eventKey="ingredientes" title="Ingredientes">
            <div className="admin-tab-content">
              <AdminIngredientes />
            </div>
          </Tab>

          <Tab eventKey="usuarios" title="Usuarios">
            <div className="admin-tab-content">
              <AdminUsuarios />
            </div>
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
};

export default Admin;