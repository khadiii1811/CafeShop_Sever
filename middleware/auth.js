import jwt from 'jsonwebtoken';

// Middleware xác thực thông tin user
const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Vui lòng đăng nhập trước khi tiếp tục.' });
  }

  try {
    const tokenValue = token.split(' ')[1]; // Lấy token từ "Bearer <token>"
    const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);
    req.user = decoded; // Gán thông tin user vào request
    next();
  } catch (error) {
    console.error('Token không hợp lệ hoặc hết hạn.', error);
    return res.status(401).json({ message: 'Token không hợp lệ hoặc hết hạn.' });
  }
};

// Middleware xác thực token giỏ hàng
export const authenticateToken = (req, res, next) => {
  console.log('Middleware được gọi'); 
  const tokenHeader = req.headers['authorization'];
  
  if (!tokenHeader) {
    return res.status(401).json({ message: 'Không tìm thấy token' });
  }

  const token = tokenHeader.split(' ')[1];
  
  console.log('Token từ header: ', token); 

  if (!token) {
    return res.status(401).json({ message: 'Token không hợp lệ' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token: ', decoded); // Debug payload
    req.cart = decoded.cart || [];
    next();
  } catch (error) {
    console.error('Error khi xác thực token:', error);
    return res.status(403).json({ message: 'Token không hợp lệ hoặc hết hạn' });
  }
};

export default authMiddleware; // Export mặc định authMiddleware
