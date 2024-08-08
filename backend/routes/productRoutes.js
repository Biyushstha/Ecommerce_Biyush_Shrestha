const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products', error });
  }
});

// GET a product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch product', error });
  }
});

// POST a new product
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    const imageUrl = req.file ? req.file.path : null;

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      stock,
      imageUrl
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error('Error adding product:', err);
    res.status(500).json({ error: 'Failed to add product' });
  }
});

// PUT to update a product
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    const imageUrl = req.file ? req.file.path : req.body.imageUrl; // Retain existing image if no new image is provided

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, category, stock, imageUrl },
      { new: true }
    );

    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json(updatedProduct);
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ error: 'Failed to update product' });
  }
});


// DELETE a product
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

module.exports = router;
