import { useState } from 'react';
import { Container, Tab, Tabs } from 'react-bootstrap';
import AdminUsuarios from './AdminUsuarios';
import AdminPublicaciones from './AdminPublicaciones';
import AdminCategorias from './AdminCategorias';
import AdminIngredientes from './AdminIngredientes';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('usuarios');

  return (
    <Container className="py-4">
      <h1 className="mb-4">Panel de Administración</h1>
      
      <Tabs
        id="admin-tabs"
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-3"
      >
        <Tab eventKey="usuarios" title="👥 Usuarios">
          <AdminUsuarios />
        </Tab>
        
        <Tab eventKey="publicaciones" title="📦 Publicaciones">
          <AdminPublicaciones />
        </Tab>
        
        <Tab eventKey="categorias" title="🏷️ Categorías">
          <AdminCategorias />
        </Tab>
        
        <Tab eventKey="ingredientes" title="🥚 Ingredientes">
          <AdminIngredientes />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Admin;
