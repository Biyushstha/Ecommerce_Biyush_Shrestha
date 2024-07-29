const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  status: { type: String, required: true },
  items: [{
    product_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    quantity: { type: Number, required: true },
    totalAmount: { type: Number, required: true }
  }],
  orderDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);
