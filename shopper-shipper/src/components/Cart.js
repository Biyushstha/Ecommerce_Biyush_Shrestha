import React, { useContext } from 'react';
import CartContext from '../context/CartContext';
import Header from '../components/Header';  // Adjust path if necessary
import Footer from '../components/Footer';  // Adjust path if necessary
import './Cart.css'; // Ensure the path is correct

const Cart = () => {
  const { cart, removeFromCart, adjustQuantity } = useContext(CartContext);

  const handleRemove = (productId) => {
    removeFromCart(productId);
  };

  const handleQuantityChange = (productId, event) => {
    const newQuantity = parseInt(event.target.value);
    if (newQuantity > 0) {
      adjustQuantity(productId, newQuantity);
    }
  };

  return (
    <div className="cart-page">
      <Header />
      <main>
        <div className="cart-container">
          <h1>Your Cart</h1>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map(item => (
                <tr key={item._id} className="cart-item">
                  <td><img src={item.imageUrl} alt={item.name} className="cart-item-image" /></td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>${item.price}</td>
                  <td>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(event) => handleQuantityChange(item._id, event)}
                      min="1"
                      className="cart-item-quantity"
                    />
                  </td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button onClick={() => handleRemove(item._id)} className="remove-button">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="checkout-container">
            <button className="checkout-button">Checkout</button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
