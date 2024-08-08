// const express = require('express');
// const router = express.Router();
// const Product = require('../models/Product'); // Update with the correct path
// const multer = require('multer');
// const path = require('path');

// // Configure multer for file uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });

// const upload = multer({ storage: storage });

// // POST endpoint for adding a new product
// router.post('/', upload.single('image'), async (req, res) => {
//   try {
//     const { name, description, price, category, stock } = req.body;
//     const image = req.file ? req.file.path : null;

//     const newProduct = new Product({
//       name,
//       description,
//       price,
//       category,
//       stock,
//       imageUrl
//     });

//     await newProduct.save();
//     res.status(201).json(newProduct);
//   } catch (err) {
//     console.error('Error adding product:', err);
//     res.status(500).json({ error: 'Failed to add product' });
//   }
// });



// // PUT endpoint for editing an existing product
// router.put('/:id', upload.single('image'), async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, description, price, category, stock } = req.body;
//     const image = req.file ? req.file.path : null;

//     const updatedProduct = await Product.findByIdAndUpdate(id, {
//       name,
//       description,
//       price,
//       category,
//       stock,
//       image
//     }, { new: true });

//     if (!updatedProduct) {
//       return res.status(404).json({ error: 'Product not found' });
//     }

//     res.json(updatedProduct);
//   } catch (err) {
//     console.error('Error updating product:', err);
//     res.status(500).json({ error: 'Failed to update product' });
//   }
// });

// // DELETE endpoint for removing a product
// router.delete('/:id', async (req, res) => {
//   try {
//     const { id } = req.params;

//     const deletedProduct = await Product.findByIdAndDelete(id);

//     if (!deletedProduct) {
//       return res.status(404).json({ error: 'Product not found' });
//     }

//     res.json({ message: 'Product deleted successfully' });
//   } catch (err) {
//     console.error('Error deleting product:', err);
//     res.status(500).json({ error: 'Failed to delete product' });
//   }
// });

// module.exports = router;
