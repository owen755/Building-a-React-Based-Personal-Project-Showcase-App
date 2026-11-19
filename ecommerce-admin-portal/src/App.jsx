import { Routes, Route } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import AddProductPage from './pages/AddProductPage';
import ProductDetailPage from './pages/ProductDetailPage';

export default function App() {
  return (
    <ProductProvider>
      <NavBar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/new" element={<AddProductPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
        </Routes>
      </main>
    </ProductProvider>
  );
}