import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Ensure the path is correct

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-logo">
          <Link to="/">Shopper-Shipper</Link>
        </div>
        <nav className="header-nav">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact Us</Link>
        </nav>
        <div className="header-cart">
          <Link to="/cart">Cart</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
