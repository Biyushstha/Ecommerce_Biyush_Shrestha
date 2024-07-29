const mongoose = require('mongoose');
const Product = require('./models/Product'); // Make sure this path is correct

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');

    // Define sample products
    const products = [
       
      {
        name: 'Product 1',
        description: 'Description for product 1',
        price: 10.99,
        category: 'Category 1',
        stock: 100,
        imageUrl: './images/img3.jpeg'
      },
      {
        name: 'Product 2',
        description: 'Description for product 2',
        price: 20.99,
        category: 'Category 2',
        stock: 50,
        imageUrl: './images/img3.jpeg'
      },
      {
        name: 'Product 3',
        description: 'Description for product 1',
        price: 10.99,
        category: 'Category 1',
        stock: 100,
        imageUrl: './images/img3.jpeg'
      },
      {
        name: 'Product 4',
        description: 'Description for product 2',
        price: 20.99,
        category: 'Category 2',
        stock: 50,
        imageUrl: './images/img3.jpeg'
      }
    ];

    // Add products to the database
    Product.insertMany(products)
      .then(() => {
        console.log('Products added');
        mongoose.connection.close();
      })
      .catch(err => {
        console.error('Error adding products:', err);
        mongoose.connection.close();
      });
  })
  .catch(err => console.error('MongoDB connection error:', err));
