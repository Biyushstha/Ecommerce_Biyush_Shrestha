import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import CartContext from '../context/CartContext';
import Header from '../components/Header'; // Adjust path if necessary
import Footer from '../components/Footer'; // Adjust path if necessary
import './ProductDetails.css'; // Ensure the path is correct

const ProductDetails = () => {
  const { id } = useParams(); // Get product ID from URL parameters
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5001/api/products/${id}`)
      .then(response => setProduct(response.data))
      .catch(error => console.error('Error fetching product:', error));
  }, [id]);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: 1 });
    navigate('/cart');  // Navigate to the cart page after adding product to cart
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <Header />
      <div className="product-details">
        <h1>{product.name}</h1>
        {product.imageUrl ? (
          <img 
            src={`http://localhost:5001/${product.imageUrl}`} 
            alt={product.name} 
            className="product-image" 
          />
        ) : (
          <p>No Image Available</p>
        )}
        <p>{product.description}</p>
        <p className="product-price">${product.price}</p>
        <button onClick={handleAddToCart} className="add-to-cart-button">Add to Cart</button>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;
