const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');

// GET all orders with populated product details
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find()
      .populate({
        path: 'items.product_id',
        select: 'name imageUrl' // Ensure 'name' and 'imageUrl' are included
      });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders', error });
  }
});

// POST a new order
router.post('/', async (req, res) => {
  const { user_id, status, items, orderDate, name, address, email, cardNumber, coupon } = req.body;
  try {
    const newOrder = new Order({ user_id, status, items, orderDate, name, address, email, cardNumber, coupon });
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create order', error });
  }
});

module.exports = router;
