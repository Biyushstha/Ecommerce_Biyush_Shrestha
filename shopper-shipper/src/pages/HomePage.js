import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';  
import Footer from '../components/Footer';  
import './HomePage.css';

const categories = [
  "Fashion",
  "Electronics",
  "Digital Services",
  "Cosmetics and Body Care",
  "Food and Beverage",
  "Furniture and Decor",
  "Health and Wellness",
  "Household Items",
  "Media",
  "Pet Care",
  "Office Equipments"
];

const HomePage = () => {
  return (
    <div className="home-page">
      <Header />
      <main className="main-content">
        <div className="categories-card">
          <ul>
            {categories.map((category, index) => (
              <li key={index}>
                <Link to={`/products?category=${encodeURIComponent(category)}`}>{category}</Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
