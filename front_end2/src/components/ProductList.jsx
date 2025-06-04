import { useLoaderData } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function ProductList() {
  const products = useLoaderData();
  
  return (
    <div className="product-list">
      <h2>Products</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>
              <h3>{product.name}</h3>
            </Link>
            <p>{product.description}</p>
            <p>Price: ${product.base_price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}