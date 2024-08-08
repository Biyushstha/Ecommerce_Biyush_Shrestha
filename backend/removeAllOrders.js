const mongoose = require('mongoose');
require('dotenv').config();

const Order = require('./models/Order'); // Adjust the path as necessary

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('MongoDB connected');

    try {
      const result = await Order.deleteMany({});
      console.log('All orders deleted successfully:', result.deletedCount);
    } catch (error) {
      console.error('Error deleting orders:', error);
    } finally {
      mongoose.disconnect(); // Close the connection
    }
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
