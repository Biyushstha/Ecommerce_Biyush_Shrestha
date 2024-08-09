import React, { useState, useContext } from 'react';
import CartContext from '../context/CartContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './Checkout.module.css'; // Import CSS module

const Checkout = () => {
  const { cart } = useContext(CartContext);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    cardNumber: '',
    coupon: ''
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        user_id: 'some-user-id', // Replace with actual user ID
        status: 'Pending',
        items: cart.map(item => ({
          product_id: item._id,
          quantity: item.quantity,
          totalAmount: item.price * item.quantity,
          imageUrl: item.imageUrl // Include the image URL
        })),
        orderDate: new Date(),
        // Include form data in the request body
        name: formData.name,
        address: formData.address,
        email: formData.email,
        cardNumber: formData.cardNumber,
        coupon: formData.coupon
      };

      const response = await axios.post('http://localhost:5001/api/orders', orderData);

      if (response.status === 201) { // 201 Created is the success status for POST requests
        setSuccessMessage('Your order has been placed successfully!');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        setError('Failed to submit order');
      }
    } catch (error) {
      console.error('Submit order error:', error); // Add more detailed logging
      setError('An error occurred while submitting the order');
    }
  };

  return (
    <div className={styles['checkout-page']}>
      <Header />
      <main className={styles['main-content']}>
        <div className={styles['container']}>
          <div className={styles['checkout-form']}>
            <h1 className={styles['title']}>Checkout</h1>
            <form onSubmit={handleSubmit}>
              <div className={styles['form-group']}>
                <label className={styles['label']}>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={styles['input']}
                  required
                />
              </div>
              <div className={styles['form-group']}>
                <label className={styles['label']}>Address:</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={styles['input']}
                  required
                />
              </div>
              <div className={styles['form-group']}>
                <label className={styles['label']}>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={styles['input']}
                  required
                />
              </div>
              <div className={styles['form-group']}>
                <label className={styles['label']}>Card Number:</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  className={styles['input']}
                  required
                />
              </div>
              {error && <p className={styles['error-message']}>{error}</p>}
              {successMessage && <p className={styles['success-message']}>{successMessage}</p>}
            </form>
          </div>
          <div className={styles['order-summary']}>
            <h2 className={styles['summary-title']}>Order Summary</h2>
            {cart.map(item => (
              <div key={item._id} className={styles['order-item']}>
                <img 
                  src={`http://localhost:5001/${item.imageUrl}`} 
                  alt={item.name} 
                  className={styles['item-image']} 
                />
                <div className={styles['item-details']}>
                  <p className={styles['item-name']}>{item.name}</p>
                  <p className={styles['item-description']}>{item.description}</p>
                  <p className={styles['item-price']}>${item.price.toFixed(2)}</p>
                  <p className={styles['item-quantity']}>Quantity: {item.quantity}</p>
                </div>
              </div>
            ))}
            <div className={styles['total-container']}>
              <p className={styles['total-label']}>Total Price:</p>
              <p className={styles['total-amount']}>${cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}</p>
            </div>
            <div className={styles['coupon-container']}>
              <input
                type="text"
                name="coupon"
                value={formData.coupon}
                onChange={handleChange}
                placeholder="Enter coupon code"
                className={styles['coupon-input']}
              />
              <button type="button" className={styles['apply-button']}>Apply</button>
            </div>
            <button type="submit" className={styles['submit-button']} onClick={handleSubmit}>Order</button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
