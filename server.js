const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/products');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/qrcodes', express.static(__dirname + '/qrcodes'));
app.use('/api/products', productRoutes);
app.get('/', (req, res) => {
  res.send('✅ QR Product Tracker API is running!');
});


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
  console.log('Server running');
});
