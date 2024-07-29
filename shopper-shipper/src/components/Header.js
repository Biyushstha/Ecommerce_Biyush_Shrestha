import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css'; // Ensure the path is correct

const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-logo">
          <Link to="/">Shopper-Shipper</Link>
        </div>
        <nav className="header-nav">
          <Link to="/" className={currentPath === '/' ? 'active' : ''}>Home</Link>
          <Link to="/products" className={currentPath.startsWith('/products') ? 'active' : ''}>Products</Link>
          <Link to="/about" className={currentPath === '/about' ? 'active' : ''}>About Us</Link>
          <Link to="/contact" className={currentPath === '/contact' ? 'active' : ''}>Contact Us</Link>
        </nav>
        <div className="header-cart">
          <Link to="/cart">Cart</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
