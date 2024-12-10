import db from '../utils/db.js';
import bcrypt from 'bcrypt';

async function registerUser(email, password) {
    const existingUser = await db('customer').where({ email }).first();

    if (existingUser) {
        // Ném ra lỗi nếu email đã tồn tại
        throw new Error('Email đã tồn tại. Vui lòng sử dụng email khác.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Thêm người dùng vào bảng 'customer'
    const [userId] = await db('customer').insert({ email, password: hashedPassword });
    return { id: userId, email };
}

export default {
    registerUser,
};
