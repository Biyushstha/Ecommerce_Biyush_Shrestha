import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import Header from '../components/Header';  // Adjust path if necessary
import Footer from '../components/Footer';  // Adjust path if necessary
import './ProductList.css'; 

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const location = useLocation();

  const itemsPerPage = 24; // 4 products per row x 6 rows

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
  }, [filterProducts]);

  useEffect(() => {
    filterProducts(products);
  }, [location.search, products, filterProducts]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginateProducts = (products) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return products.slice(startIndex, endIndex);
  };

  useEffect(() => {
    setTotalPages(Math.ceil(filteredProducts.length / itemsPerPage));
  }, [filteredProducts]);

  return (
    <div className="product-list-page">
      <Header />
      <main>
        <h1>Products</h1>
        <div className="product-list-container">
          {paginateProducts(filteredProducts).map(product => (
            <div key={product._id} className="product-card">
              <img 
                src={`http://localhost:5001/${product.imageUrl}`} 
                alt={product.name} 
                className="product-image"
              />
              <h2 className="product-name">{product.name}</h2>
              <p className="product-price">${product.price}</p>
              <Link to={`/products/${product._id}`} className="view-details-link">View Details</Link>
            </div>
          ))}
        </div>
        <div className="pagination">
          {[...Array(totalPages).keys()].map(page => (
            <button
              key={page + 1}
              className={`pagination-button ${currentPage === page + 1 ? 'active' : ''}`}
              onClick={() => handlePageChange(page + 1)}
            >
              {page + 1}
            </button>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductList;
