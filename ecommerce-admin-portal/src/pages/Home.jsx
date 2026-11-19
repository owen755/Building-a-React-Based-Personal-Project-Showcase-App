import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section className="hero">
      <h1>E-Commerce Admin Portal</h1>
      <p>
        Manage your store inventory in one place. View products, search dynamically,
        add new items, and update pricing in real time.
      </p>
      <div className="hero-actions">
        <Link to="/products" className="btn">View Products</Link>
        <Link to="/products/new" className="btn btn-secondary">Add New Product</Link>
      </div>
    </section>
  );
}