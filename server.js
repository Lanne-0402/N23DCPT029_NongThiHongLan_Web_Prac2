const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const orderRoutes = require('./routes/orderRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Kết nối MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('☑ MongoDB Connected!'))
  .catch(err => console.error('☒ Connection error:', err));

// Route kiểm tra máy chủ
app.get('/', (req, res) => {
  res.send('API Quan ly Don hang dang hoat dong...');
});

// Định tuyến API đơn hàng
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});