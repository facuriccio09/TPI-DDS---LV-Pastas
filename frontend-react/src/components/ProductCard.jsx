import { Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ producto }) => {
  const { id, nombre, descripcion, precio, categoria, disponible, destacado, imagen } = producto;

  return (
    <Card className="product-card h-100 shadow-sm">
      {imagen && (
        <Card.Img 
          variant="top" 
          src={imagen} 
          alt={nombre}
          className="product-card-img"
        />
      )}
      
      <Card.Body className="d-flex flex-column">
        <div className="mb-2">
          {destacado && (
            <Badge bg="danger" className="me-2">
              ⭐ Destacado
            </Badge>
          )}
          {categoria && (
            <Badge bg="success">
              {categoria}
            </Badge>
          )}
        </div>

        <Card.Title className="product-title">{nombre}</Card.Title>
        
        <Card.Text className="product-description text-muted flex-grow-1">
          {descripcion.length > 100 
            ? `${descripcion.substring(0, 100)}...` 
            : descripcion
          }
        </Card.Text>

        <div className="d-flex justify-content-between align-items-center mt-3">
          <div className="product-price">
            ${parseFloat(precio).toFixed(2)}
          </div>
          
          <Link 
            to={`/productos/${id}`} 
            className="btn btn-primary btn-sm"
          >
            Ver más
          </Link>
        </div>

        {!disponible && (
          <Badge bg="secondary" className="mt-2">
            No disponible
          </Badge>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
