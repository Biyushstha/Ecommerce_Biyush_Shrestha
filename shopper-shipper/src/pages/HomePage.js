import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';  
import Footer from '../components/Footer';  
import './HomePage.css';
import Carousel from 'react-bootstrap/Carousel'; // Import the Carousel component

// Import local images
import img1 from '../Image/img 1.jpg';
import img2 from '../Image/img 2.jpg';
import img3 from '../Image/img 3.jpg';

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
        <div className="categories-container">
          <div className="categories-card">
            <ul>
              {categories.map((category, index) => (
                <li key={index}>
                  <Link to={`/products?category=${encodeURIComponent(category)}`}>{category}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="carousel-container">
            <Carousel interval={2000} controls={false} indicators={true}>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={img1}
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={img2}
                  alt="Second slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={img3}
                  alt="Third slide"
                />
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
