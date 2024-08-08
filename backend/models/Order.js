const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  status: { type: String, required: true },
  items: [{
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    imageUrl: { type: String } // Add this field
  }],
  orderDate: { type: Date, required: true },
  name: { type: String },
  address: { type: String },
  email: { type: String },
  cardNumber: { type: String },
  coupon: { type: String }
});

module.exports = mongoose.model('Order', orderSchema);
