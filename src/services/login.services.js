import db from '../utils/db.js';
import bcrypt from 'bcrypt';

// Register a new user

// Authenticate a user during login
async function authenticate(email) {
    try {
      const adminUser = await db('admin').where({ email }).first();
      if (adminUser) {
        return { 
          id: adminUser.adminId, 
          email: adminUser.email, 
          role_id: adminUser.role_id,
          password: adminUser.password // Thêm mật khẩu từ database
        };
      }
  
      const customerUser = await db('customer').where({ email }).first();
      if (customerUser) {
        return { 
          id: customerUser.customerId, 
          email: customerUser.email, 
          role_id: customerUser.role_id,
          password: customerUser.password // Thêm mật khẩu từ database
        };
      }
  
      return null; // Không tìm thấy user hợp lệ
    } catch (error) {
      console.error('Lỗi tìm user:', error);
      throw new Error('Database error');
    }
  }
// async function authenticate(email, password) {
//     const user = await db('customer').where({ email }).first();

//     if (user && user.password === password) {
//         return user;  // Mật khẩu khớp
//     }
//     return null;  // Mật khẩu không khớp
// }

export default {
    authenticate,
};
