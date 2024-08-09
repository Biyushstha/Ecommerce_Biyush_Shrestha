import React, { useState, useEffect } from 'react';
import Header from '../components/Header';  
import Footer from '../components/Footer'; 
import axios from 'axios';
import './MyOrders.css'; 

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/orders');
        setOrders(response.data);
      } catch (error) {
        setError('Failed to fetch orders');
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="my-orders-page">
      <Header />
      <main>
        <div className="orders-container">
          <h1>My Orders</h1>
          {error && <p className="error">{error}</p>}
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Image</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => 
                order.items.map(item => (
                  <tr key={`order-${order._id}-item-${item.product_id}`}>
                    <td>{order._id}</td>
                    <td>
                      {item.product_id && item.product_id.imageUrl ? (
                        <img 
                          src={`http://localhost:5001/${item.product_id.imageUrl}`} 
                          alt={item.product_id.name} 
                          className="product-image"
                        />
                      ) : (
                        <p>No Image</p>
                      )}
                    </td>
                    <td>{item.product_id ? item.product_id.name : 'Unknown'}</td>
                    <td>{item.quantity}</td>
                    <td>{order.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MyOrders;
