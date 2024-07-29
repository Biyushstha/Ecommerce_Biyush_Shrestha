import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import Header from '../components/Header';  // Adjust path if necessary
import Footer from '../components/Footer';  // Adjust path if necessary
import './ProductList.css'; // Ensure the correct path to your CSS file

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const location = useLocation();

  // Wrap filterProducts in useCallback to avoid redefinition on every render
  const filterProducts = useCallback((products) => {
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get('category');
    if (category) {
      setFilteredProducts(products.filter(product => product.category === category));
    } else {
      setFilteredProducts(products);
    }
  }, [location.search]);

  useEffect(() => {
    axios.get('http://localhost:5001/api/products') // Ensure the correct port
      .then(response => {
        setProducts(response.data);
        filterProducts(response.data); // Filter products when fetched
      })
      .catch(error => console.error('Error fetching products:', error));
  }, [filterProducts]); // Ensure filterProducts is included in dependencies

  useEffect(() => {
    filterProducts(products);
  }, [location.search, products, filterProducts]); // Include filterProducts in dependencies

  return (
    <div className="product-list-page">
      <Header />
      <main>
        <h1>Products</h1>
        <div className="product-list">
          {filteredProducts.map(product => (
            <div key={product._id} className="product-card">
              <img src={product.imageUrl} alt={product.name} />
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>${product.price}</p>
              <Link to={`/products/${product._id}`} className="view-details-link">View Details</Link>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductList;
