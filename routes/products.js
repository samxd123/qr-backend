const express = require('express');
const router = express.Router();
const QRCode = require('qrcode');
const Product = require('../models/product');

// Create product and generate QR as Data URL
router.post('/', async (req, res) => {
  const { productId, name, price, description, stock } = req.body;

  try {
    // Save product to DB
    const newProduct = new Product({ productId, name, price, description, stock });
    await newProduct.save();

    // Generate QR as data URL (not a file)
    const qrDataUrl = await QRCode.toDataURL(productId);

    res.json({
      message: 'Product created successfully',
      qrDataUrl
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

  // Fetch product by productId
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ productId: req.params.id });
    if (!product) return res.status(404).json({ message: 'Not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;
