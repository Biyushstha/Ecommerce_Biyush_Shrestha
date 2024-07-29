import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ProductList from '../components/ProductList';
import ProductDetails from '../components/ProductDetails';
import Cart from '../components/Cart';
import { CartProvider } from '../context/CartContext';

const AppRoutes = () => (
  <Router>
    <CartProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </CartProvider>
  </Router>
);

export default AppRoutes;
