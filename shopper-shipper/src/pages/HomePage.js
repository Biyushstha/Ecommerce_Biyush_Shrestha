import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to Our Store</h1>
      <div className="categories">
        <Link to="/products?category=Category 1">Category 1</Link>
        <Link to="/products?category=Category 2">Category 2</Link>
      </div>
    </div>
  );
};

export default HomePage;
