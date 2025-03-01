import { Link } from 'react-router-dom';
import "./ProductCard.css"
import ButtonAddCart from './ButtonAddCart';
export default function ProductCard({ product }) {
  return (
    <>
      <div className="articulos"  >
        <h3>
          {product.title}
        </h3>
        <img src={product.image} alt={product.title} />
        <p>${product.price}</p>
        <p>Stock: {product.stock}</p>
        <button>
          <Link to={`/product/${product.id}`}>Mas detalles</Link>
        </button>
      </div>
    </>
  );
}
