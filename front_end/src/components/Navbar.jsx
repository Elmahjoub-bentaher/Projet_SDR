import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav>
      <Link to="/">Home | </Link>
      <Link to="/products">Products | </Link>
      <Link to="/products/new">Add Product</Link>
    </nav>
  );
}