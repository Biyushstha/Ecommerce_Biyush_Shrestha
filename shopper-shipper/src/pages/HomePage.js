import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';  // Adjust path if necessary
import Footer from '../components/Footer';  // Adjust path if necessary
import './HomePage.css'; // Ensure the path is correct

const HomePage = () => {
  return (
    <div className="home-page">
      <Header />
      <main className="main-content">
        <div className="categories-card">
          <ul>
            <li><Link to="/products?category=Category 1">Category 1</Link></li>
            <li><Link to="/products?category=Category 2">Category 2</Link></li>
            
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
