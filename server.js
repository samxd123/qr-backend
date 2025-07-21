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


mongoose.connect('mongodb+srv://leasyto:z2TeL479ykSSBdxc@samclus.yytjfbu.mongodb.net/?retryWrites=true&w=majority&appName=SamClus', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
  app.listen(3000, () => console.log('Server running on http://localhost:3000'));
});
