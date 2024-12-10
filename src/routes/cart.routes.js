import express from 'express';
import jwt from 'jsonwebtoken';
import {authenticateToken}  from '../../middleware/auth.js';
import cartService from '../services/cart.service.js';
const router = express.Router();  
// Giỏ hàng tạm thời lưu trong server-side session hoặc bộ nhớ
let cart = [];

router.post('/add', authenticateToken, (req, res) => {
  const { productId, productName, price, quantity, imgUrl } = req.product;

  const existingProduct = cart.find((item) => item.productId === productId);

  if (existingProduct) {
    existingProduct.quantity += quantity; 
  } else {
    cart.push({ productId, productName, price, quantity, imgUrl });
  }

  res.json({
    success: true,
    message: 'Thêm sản phẩm vào giỏ hàng thành công!',
    cart,
  });
});

  router.get('/cart', authenticateToken, (req, res) => {
    res.json({ success: true, cart: req.cart });
  });
  router.post('/save_order',  async (req, res) => {
    const { userId, cartItems, subtotal } = req.body;

    console.log('userId: ', userId);
    console.log('cartItems: ', cartItems);
    console.log('subtotal: ', subtotal);
  
    if (!userId) {
      return res.status(400).json({ success: false, message: 'User ID không hợp lệ!' });
    }
  
    if (!cartItems || !cartItems.length) {
      return res.status(400).json({ success: false, message: 'Giỏ hàng trống!' });
    }
  
    try {
      const result = await cartService.saveOrder(userId, cartItems, subtotal);
  
      if (result.success) {
        res.json({ success: true, orderId: result.orderId });
      } else {
        res.status(400).json({ success: false, message: 'Lưu đơn hàng thất bại!' });
      }
    } catch (error) {
      console.error('Có lỗi xảy ra:', error);
      res.status(500).json({ success: false, message: 'Server Error!' });
    }
  });
  
export default router;
