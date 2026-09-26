const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.get('/search', async (req, res) => {
  try {
    const { name } = req.query;
    const orders = await Order.find({
      customerName: { $regex: name || '',$options: 'i' }
    });

    res.json({
      success: true,
      data: orders,
      message: `Tìm thấy ${orders.length} đơn hàng khớp với từ khóa "${name || ''}"`
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      data: null,
      message: err.message
    });
  }
});

router.get('/', async (req, res) => {
  try {
    const { status, sort } = req.query;
    let filter = {};
    if (status) filter.status = status;

    let query = Order.find(filter);

    if (sort === 'asc' || sort === 'desc') {
      const sortOrder = sort === 'asc' ? 1 : -1;
      query = query.sort({ totalAmount: sortOrder });
    } else {
      query = query.sort({ createdAt: -1 });
    }

    const orders = await query;
    res.json({
      success: true,
      data: orders,
      message: 'Lấy danh sách đơn hàng thành công'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      data: null,
      message: err.message
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        data: null,
        message: 'Khong tim thay don hang'
      });
    }

    res.json({
      success: true,
      data: order,
      message: 'Lấy thông tin đơn hàng thành công'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      data: null,
      message: err.message
    });
  }
});

router.post('/', async (req, res) => {
  const { customerName, customerEmail, items, totalAmount, status } = req.body;

  // Kiểm tra danh sách sản phẩm hợp lệ
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      success: false,
      data: null,
      message: 'Đơn hàng phải chứa ít nhất 1 sản phẩm!'
    });
  }

  const calculatedTotal = items.reduce((sum, item) => {
    return sum + (Number(item.quantity) * Number(item.unitPrice));
  }, 0);

  if (calculatedTotal !== Number(totalAmount)) {
    return res.status(400).json({
      success: false,
      data: null,
      message: `Tổng tiền không hợp lệ! Thực tế tính toán là: ${calculatedTotal}, nhưng dữ liệu gửi lên là: ${totalAmount}`
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
    res.status(201).json({
      success: true,
      data: newOrder,
      message: 'Tạo đơn hàng mới thành công'
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      data: null,
      message: err.message
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        data: null,
        message: 'Khong tim thay don hang'
      });
    }

    res.json({
      success: true,
      data: updatedOrder,
      message: 'Cập nhật đơn hàng thành công'
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      data: null,
      message: err.message
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        data: null,
        message: 'Khong tim thay don hang'
      });
    }

    res.json({
      success: true,
      data: deleted,
      message: 'Da xoa don hang thanh cong!'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      data: null,
      message: err.message
    });
  }
});

module.exports = router;