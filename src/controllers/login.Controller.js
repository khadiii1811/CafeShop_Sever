import managerLoginService from '../services/login.services.js';

const handleLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Gọi service để kiểm tra thông tin đăng nhập
        const user = await managerLoginService.authenticate(email, password);

        if (user) {
            return res.status(200).json({ message: 'Đăng nhập thành công' });
        } else {
            // Đăng nhập thất bại
            return res.status(401).json({ message: 'Thông tin đăng nhập không chính xác' });
        }
    } catch (error) {
        // Xử lý lỗi nếu có vấn đề trong quá trình kiểm tra
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Đã xảy ra lỗi. Vui lòng thử lại sau.' });
    }
};

export default handleLogin;
