import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProductContext } from '../context/ProductContext';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, updateProduct, deleteProduct } = useProductContext();

  const product = products.find((p) => String(p.id) === String(id));
  const [price, setPrice] = useState('');
  const [name, setName] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (product) {
      setPrice(product.price);
      setName(product.name);
    }
  }, [product]);

  if (!product) return <p className="status">Product not found.</p>;

  async function handleUpdate(e) {
    e.preventDefault();
    await updateProduct(product.id, { name, price: parseFloat(price) });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  async function handleDelete() {
    await deleteProduct(product.id);
    navigate('/products');
  }

  return (
    <section className="page detail-page">
      <Link to="/products" className="back-link">← Back to Products</Link>
      <div className="detail-layout">
        <img src={product.image} alt={product.name} className="detail-img" />
        <div className="detail-info">
          <span className="badge">{product.category}</span>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p><strong>Origin:</strong> {product.origin}</p>
          <p className="price">Current Price: ${Number(product.price).toFixed(2)}</p>

          <form className="edit-form" onSubmit={handleUpdate}>
            <h3>Update Product</h3>
            <label htmlFor="edit-name">Name</label>
            <input id="edit-name" value={name} onChange={(e) => setName(e.target.value)} required />

            <label htmlFor="edit-price">Price ($)</label>
            <input
              id="edit-price"
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />

            <div className="card-actions">
              <button type="submit" className="btn">Save Changes</button>
              <button type="button" className="btn btn-danger" onClick={handleDelete}>
                Delete Product
              </button>
            </div>
            {saved && <p className="saved-msg">Product updated!</p>}
          </form>
        </div>
      </div>
    </section>
  );
}