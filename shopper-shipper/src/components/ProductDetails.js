import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header'; // Adjust path if necessary
import Footer from '../components/Footer'; // Adjust path if necessary
import CartContext from '../context/CartContext'; // Adjust path if necessary
import './ProductDetails.css'; // Ensure this file exists for styling

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext); // Use CartContext
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios.get(`http://localhost:5001/api/products/${id}`)
      .then(response => setProduct(response.data))
      .catch(error => console.error('Error fetching product details:', error));
  }, [id]);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    alert(`${product.name} has been added to your cart!`);
  };

  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(prevQuantity => Math.max(prevQuantity - 1, 1)); // Ensure quantity is at least 1
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-details-page">
      <Header />
      <main className="product-details-main">
        <div className="product-details-container">
          <img 
            src={`http://localhost:5001/${product.imageUrl}`} 
            alt={product.name} 
            id="product-details-image" // Unique ID
            className="product-details-image"
          />
          <div className="product-details-info">
            <h1 className="product-details-name">{product.name}</h1>
            <p className="product-details-price">${product.price}</p>
            <p className="product-details-description">{product.description}</p>
            <div className="quantity-container">
              <button className="quantity-button" onClick={decreaseQuantity}>-</button>
              <input 
                type="number"
                id="quantity"
                value={quantity}
                readOnly
                className="quantity-input"
              />
              <button className="quantity-button" onClick={increaseQuantity}>+</button>
            </div>
            <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetails;
