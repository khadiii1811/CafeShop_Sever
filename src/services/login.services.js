import db from '../utils/db.js';
import bcrypt from 'bcrypt';

// Register a new user

// Authenticate a user during login
async function authenticate(email) {
    try {
        const user = await db('customer').where({ email }).first();
        return user;
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
