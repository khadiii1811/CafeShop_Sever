import express from 'express';
import adminDashboardService from'../../services/admin/adminDashboard.service.js';
const router = express.Router();  

router.get('/load', async (req, res) => {
    try {
      const data = await adminDashboardService.getDashboardData();
      console.log('Dashboard Data:', data);
      return res.status(200).json({
        success: true,
        data,
        message: 'Thông tin dashboard đã được tải thành công',
      });
    } catch (error) {
      console.error('Error in /load route:', error);
      return res.status(500).json({
        success: false,
        message: 'Đã xảy ra lỗi, vui lòng thử lại sau.',
      });
    }
  });
  
export default router;
