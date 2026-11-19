import { useState, useId } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductContext } from '../context/ProductContext';

export default function AddProductPage() {
  const { addProduct } = useProductContext();
  const navigate = useNavigate();
  const baseId = useId();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    origin: '',
    price: '',
    category: '',
    image: '',
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await addProduct({
      ...formData,
      price: parseFloat(formData.price),
      image:
        formData.image ||
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
    });
    navigate('/products');
  }

  return (
    <section className="page">
      <h2>Add New Product</h2>
      <form className="product-form" onSubmit={handleSubmit}>
        <label htmlFor={`${baseId}-name`}>Product Name</label>
        <input id={`${baseId}-name`} name="name" value={formData.name} onChange={handleChange} required />

        <label htmlFor={`${baseId}-desc`}>Description</label>
        <textarea id={`${baseId}-desc`} name="description" value={formData.description} onChange={handleChange} required />

        <label htmlFor={`${baseId}-origin`}>Origin</label>
        <input id={`${baseId}-origin`} name="origin" value={formData.origin} onChange={handleChange} required />

        <label htmlFor={`${baseId}-category`}>Category</label>
        <input id={`${baseId}-category`} name="category" value={formData.category} onChange={handleChange} required />

        <label htmlFor={`${baseId}-price`}>Price ($)</label>
        <input id={`${baseId}-price`} name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} required />

        <label htmlFor={`${baseId}-image`}>Image URL (optional)</label>
        <input id={`${baseId}-image`} name="image" type="url" value={formData.image} onChange={handleChange} />

        <button type="submit" className="btn">Add Product</button>
      </form>
    </section>
  );
}