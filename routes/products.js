const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

// Create product and generate QR
router.post('/', async (req, res) => {
  const { productId, name, price, description, stock } = req.body;
  try {
    const newProduct = new Product({ productId, name, price, description, stock });
    await newProduct.save();

    const qrPath = path.join(__dirname, '..', 'qrcodes', `${productId}.png`);
    await QRCode.toFile(qrPath, productId);

    res.json({ message: 'Product created', qrUrl: `/qrcodes/${productId}.png` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

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
