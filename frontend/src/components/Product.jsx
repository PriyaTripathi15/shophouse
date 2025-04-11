import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded shadow-sm border-0" style={{ transition: 'transform 0.2s' }}>
      <Link to={`/product/${product._id}`} className="text-decoration-none">
        <Card.Img 
          src={product.image} 
          variant="top" 
          className="rounded img-fluid" 
          style={{ height: '220px', width: '100%', objectFit: 'contain' }} // Height increased to 220px
        />
      </Link>
      <Card.Body className="text-center">
        <Link to={`/product/${product._id}`} className="text-dark text-decoration-none">
          <Card.Title as="div" className="fw-bold mt-2 product-title">
            {product.name}
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <Rating value={product.rating} text={`${product.numReviews} reviews`} />
        </Card.Text>
        <Card.Text as="h3" className="text-primary fw-semibold mt-2">
          ${product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
