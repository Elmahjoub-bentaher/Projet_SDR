import { useLoaderData, useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export async function loader({ params }) {
  const response = await fetch(`http://localhost:8080/api/products/${params.id}`);
  if (!response.ok) {
    throw new Error('Product not found');
  }
  return response.json();
}

export default function ProductDetails() {
  const product = useLoaderData();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await fetch(`http://localhost:8080/api/products/${id}`, {
        method: 'DELETE'
      });
      // Redirect after deletion (react-router's navigate)
      window.location.href = '/products';
    } catch (error) {
      console.error('Delete failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-details">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.base_price?.toFixed(2)}</p>
      <div className="actions">
        <Link to={`/products/${id}/edit`} className="btn edit">
          Edit
        </Link>
        <button 
          onClick={handleDelete} 
          disabled={loading}
          className="btn delete"
        >
          {loading ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
}