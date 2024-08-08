import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer'; // Assuming you have a Footer component
import HomePage from './pages/HomePage';
import ProductList from './pages/ProductList';
import ProductDetails from './pages/ProductDetails';
import AboutUs from './pages/AboutUs'; // Create this page if it doesn't exist
import ContactUs from './pages/ContactUs'; // Create this page if it doesn't exist
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          {/* <Route path="/about" element={<AboutUs />} /> */}
          {/* <Route path="/contact" element={<ContactUs />} />h */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/hhh" element={<Checkout />} />
        </Routes>
      </main>
      <Footer /> {/* Assuming you have a Footer component */}
    </Router>
  );
};

export default App;
