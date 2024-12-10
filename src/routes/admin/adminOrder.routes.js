import express from 'express';
import adminOrderService from'../../services/admin/adminOrder.service.js';
const router = express.Router();  

router.get('/load', async (req, res) => {
    try {
        const orders = await adminOrderService.getAllOrder();
        console.log(orders);
        return res.status(200).json({
          orders,
          message: 'Lấy thông tin order thành công',
        });
      } catch (error) {
        console.error('Error fetching customers route:', error);
        return res.status(500).json({ message: 'Đã xảy ra lỗi, vui lòng thử lại sau.' });
      }
  });

  
export default router;
