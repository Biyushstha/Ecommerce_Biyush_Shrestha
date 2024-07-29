import React, { useContext } from 'react';
import CartContext from '../context/CartContext';

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
    <div>
      <h1>Your Cart</h1>
      <div className="cart-items">
        {cart.map(item => (
          <div key={item._id} className="cart-item">
            <img src={item.imageUrl} alt={item.name} />
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>${item.price}</p>
            <input
              type="number"
              value={item.quantity}
              onChange={(event) => handleQuantityChange(item._id, event)}
              min="1"
            />
            <button onClick={() => handleRemove(item._id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
