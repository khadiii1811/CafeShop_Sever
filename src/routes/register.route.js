import express from 'express';
import jwt from 'jsonwebtoken';
import managerRegisterService from '../services/register.services.js';

const router = express.Router();  // Khởi tạo router

router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    console.log("email:", email, "password:", password);

    try {
        // Gọi service để đăng ký người dùng
        const user = await managerRegisterService.registerUser(email, password);
        console.log(user);
        res.status(201).json({ message: 'Đăng ký thành công', user });
    } catch (error) {
        console.error('Đăng ký thất bại:', error.message);
        res.status(400).json({ message: error.message });
    }
});

export default router;
