import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ProductList from '../components/ProductList';
import ProductDetails from '../components/ProductDetails';
import Cart from '../components/Cart';
import Checkout from '../components/Checkout';
import { CartProvider } from '../context/CartContext';
import MyOrders from '../pages/MyOrders';
import AdminLogin from '../components/AdminLogin';

import AdminDashboard from '../components/AdminDashboard';



const AppRoutes = () => (
  <Router>
    <CartProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/admin/login" element={<AdminLogin />} />
       
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        
      </Routes>
    </CartProvider>
    
  </Router>
);

export default AppRoutes;
