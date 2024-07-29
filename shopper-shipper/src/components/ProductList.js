import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    axios.get('http://localhost:5001/api/products') // Ensure the correct port
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []); // Fetch products only once on component mount

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
    filterProducts(products);
  }, [location.search, products, filterProducts]); // Include filterProducts in dependencies

  return (
    <div>
      <h1>Products</h1>
      <div className="product-list">
        {filteredProducts.map(product => (
          <div key={product.name} className="product-card">
            <img src={product.imageUrl} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <Link to={`/products/${product._id}`}>View Details</Link> {/* Link to product details */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
