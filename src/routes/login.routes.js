import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import managerLoginService from '../services/login.services.js';
import authMiddleware from '../../middleware/auth.js'
const router = express.Router();

// Hàm tạo JWT Token
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role_id: user.role_id },
    process.env.JWT_SECRET, // Sử dụng bí mật từ .env
    { expiresIn: '1h' } // Token hết hạn sau 1 giờ
  );
};

// Route Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Password gửi từ client:', password);
  try {
    const user = await managerLoginService.authenticate(email);
    console.log('User sau khi xác thực:',user);
    if (user && await bcrypt.compare(password, user.password)) {
      const token = generateToken({
        id: user.id,
        email: user.email,
        role_id: user.role_id,
      });
      console.log('userId gửi từ server: ', user.id);
      console.log("token:" , token);
      return res.status(200).json({
        token,
        message: 'Đăng nhập thành công',
      });
    }
    return res.status(401).json({ message: 'Email hoặc mật khẩu không chính xác.' });
  } catch (error) {
    console.error('Lỗi đăng nhập:', error);
    return res.status(500).json({ message: 'Đã xảy ra lỗi, vui lòng thử lại sau.' });
  }
});

// Route Đăng Xuất
router.post('/logout', (req, res) => {
    const token = req.headers['authorization'];
    if (!token) {
      console.log('Không tìm thấy token trên request.');
      return res.status(401).json({ message: 'Không tìm thấy token.' });
    }
  
    try {
      console.log('Token nhận được:', token);
      const tokenValue = token.split(' ')[1]; // Lấy token từ 'Bearer <token>'
      const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);
      console.log('Token xác thực thành công:', decoded);
  
      res.status(200).json({ message: 'Đã logout thành công' });
    } catch (error) {
      console.error('Token không hợp lệ hoặc hết hạn.', error);
      return res.status(401).json({ message: 'Token không hợp lệ hoặc hết hạn.' });
    }
});
router.get('/profile', authMiddleware, (req, res) => {
    res.status(200).json({
      message: 'Chào mừng bạn đến với profile!',
      user: req.user, // Thông tin người dùng được giải mã từ token
    });
  });
export default router;
