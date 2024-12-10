import db from '../utils/db.js';
import bcrypt from 'bcrypt';

export default {
    async updatePassword(userId, newPassword) {
        try {
            const hashedPassword = await bcrypt.hash(newPassword, 10); // Hash mật khẩu
            await db('customer').where({ id: userId }).update({ password: hashedPassword }); // Sử dụng bảng customer
            return true; // Cập nhật thành công
        } catch (error) {
            console.error('Lỗi khi cập nhật mật khẩu:', error);
            throw error;
        }
    },

    async findUserByEmail(email) {
        try {
            const user = await db('customer').where({ email }).first(); 
            console.log(user);
            return user || null; 
        } catch (error) {
            console.error('Lỗi khi tìm người dùng qua email:', error);
            throw error; 
        }
    }
};
