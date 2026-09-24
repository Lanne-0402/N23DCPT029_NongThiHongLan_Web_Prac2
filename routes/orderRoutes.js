const express = require('express');
const router = express.Router();
const Order = require('../models/Order');


router.get('/search', async (req, res) => {
  try {
    const { name } = req.query; 
    const orders = await Order.find({
      customerName: { $regex: name || '', $options: 'i' }
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const { status, sort } = req.query;

    let filter = {};
    if (status) {
      filter.status = status;
    }

    let query = Order.find(filter);

    if (sort === 'asc' || sort === 'desc') {
      const sortOrder = sort === 'asc' ? 1 : -1;
      query = query.sort({ totalAmount: sortOrder });
    } else {
      query = query.sort({ createdAt: -1 });
    }

    const orders = await query;
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Khong tim thay don hang' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const { customerName, customerEmail, items, totalAmount, status } = req.body;

  const calculatedTotal = items?.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  if (calculatedTotal !== totalAmount) {
    return res.status(400).json({ 
      message: `Tong tien khong khop! Thuc te tinh duoc: ${calculatedTotal}, gui len: ${totalAmount}` 
    });
  }

  const order = new Order({
    customerName,
    customerEmail,
    items,
    totalAmount,
    status
  });

  try {
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedOrder) return res.status(404).json({ message: 'Khong tim thay don hang' });
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Khong tim thay don hang' });
    res.json({ message: 'Da xoa don hang thanh cong!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;