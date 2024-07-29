const mongoose = require('mongoose');
const Product = require('./models/Product'); // Make sure this path is correct

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');

    // Delete all products from the database
    Product.deleteMany({})
      .then(() => {
        console.log('All products deleted');
        mongoose.connection.close();
      })
      .catch(err => {
        console.error('Error deleting products:', err);
        mongoose.connection.close();
      });
  })
  .catch(err => console.error('MongoDB connection error:', err));
