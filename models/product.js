const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  productId: { type: String, required: true, unique: true },
  name: String,
  price: Number,
  description: String,
  stock: Number
});

module.exports = mongoose.model('Product', ProductSchema);
