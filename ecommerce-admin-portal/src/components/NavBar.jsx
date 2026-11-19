import { NavLink } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="nav-brand">ShopAdmin</div>
      <div className="nav-links">
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
          Home
        </NavLink>
        <NavLink to="/products" className={({ isActive }) => (isActive ? 'active' : '')}>
          Products
        </NavLink>
        <NavLink to="/products/new" className={({ isActive }) => (isActive ? 'active' : '')}>
          Add Product
        </NavLink>
      </div>
    </nav>
  );
}
