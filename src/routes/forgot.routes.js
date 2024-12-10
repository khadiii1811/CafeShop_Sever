import express from 'express';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import managerLoginService from '../services/forgot.services.js'; // Đảm bảo đúng đường dẫn

const router = express.Router();

// Cấu hình transporter của Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // Sử dụng Gmail hoặc thay bằng dịch vụ SMTP khác
    auth: {
        user: process.env.EMAIL_USER, // Email của bạn (phải khớp với tài khoản SMTP)
        pass: process.env.EMAIL_PASS, // Mật khẩu ứng dụng
    },
});

// Route quên mật khẩu
router.post('/forgetpass', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await managerLoginService.findUserByEmail(email);

        if (!user) {
            return res.status(404).json({ message: 'Email không tồn tại trong hệ thống' });
        }

        const token = jwt.sign({ id: user.id }, 'secretKey', { expiresIn: '15m' });

        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

 
        await transporter.sendMail({
            from: process.env.EMAIL_USER, // Email gửi đi
            to: email, // Email người nhận
            subject: 'Đặt lại mật khẩu',
            html: `<p>Click vào liên kết bên dưới để đặt lại mật khẩu:</p>
                   <a href="${resetLink}">${resetLink}</a>`,
        });

        res.status(200).json({ message: 'Email khôi phục đã được gửi' });
    } catch (error) {
        console.error('Lỗi quên mật khẩu:', error);
        res.status(500).json({ message: 'Đã xảy ra lỗi. Vui lòng thử lại sau.' });
    }
});

// Route đặt lại mật khẩu
router.post('/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        const decoded = jwt.verify(token, 'secretKey');

        const updatedUser = await managerLoginService.updatePassword(decoded.id, newPassword);

        if (updatedUser) {
            res.status(200).json({ message: 'Đặt lại mật khẩu thành công' });
        } else {
            res.status(400).json({ message: 'Không thể đặt lại mật khẩu' });
        }
    } catch (error) {
        console.error('Lỗi đặt lại mật khẩu:', error);
        res.status(400).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
    }
});

export default router;
