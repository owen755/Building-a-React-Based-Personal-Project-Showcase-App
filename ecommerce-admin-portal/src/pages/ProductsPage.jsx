import { useState, useRef, useId } from 'react';
import { Link } from 'react-router-dom';
import { useProductContext } from '../context/ProductContext';

export default function ProductsPage() {
  const { products, loading, error, deleteProduct } = useProductContext();
  const [search, setSearch] = useState('');
  const searchRef = useRef(null);
  const searchId = useId();

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p className="status">Loading products...</p>;
  if (error) return <p className="status error">Error: {error}</p>;

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <h2>Product Catalog</h2>
          <p className="subtitle">
            Showing {filtered.length} of {products.length} products
          </p>
        </div>
        <div className="search-box">
          <label htmlFor={searchId} className="sr-only">Search products</label>
          <input
            id={searchId}
            ref={searchRef}
            type="text"
            placeholder="Search by name or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              type="button"
              className="btn-clear"
              onClick={() => {
                setSearch('');
                searchRef.current?.focus();
              }}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="status">No products match "{search}".</p>
      ) : (
        <div className="product-grid">
          {filtered.map((product) => (
            <article key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <div className="card-body">
                <span className="badge">{product.category}</span>
                <h3>{product.name}</h3>
                <p className="price">${Number(product.price).toFixed(2)}</p>
                <div className="card-actions">
                  <Link to={`/products/${product.id}`} className="btn">
                    View / Edit
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteProduct(product.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}