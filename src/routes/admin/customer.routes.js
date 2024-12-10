import express from 'express';
import customerService from'../../services/admin/customer.service.js';
const router = express.Router();  

router.get('/user', async (req, res) => {
    try {
        const customers = await customerService.getAllCustomer();
        console.log(customers);
        return res.status(200).json({
          customers,
          message: 'Lấy thông tin khách hàng thành công',
        });
      } catch (error) {
        console.error('Error fetching customers route:', error);
        return res.status(500).json({ message: 'Đã xảy ra lỗi, vui lòng thử lại sau.' });
      }
  });

  router.post('/user/delete', async (req, res) => {
    console.log('Request received for delete:', req.body);
    try {
      const { id } = req.body; 
      const result = await customerService.deleteCustomer(id);
  
      if (result) {
        return res.status(200).json({
          message: 'Xóa thông tin khách hàng thành công',
        });
      } else {
        return res.status(404).json({
          message: 'Không tìm thấy khách hàng để xóa',
        });
      }
    } catch (error) {
      console.error('Error deleting customer route:', error);
      return res.status(500).json({ message: 'Đã xảy ra lỗi, vui lòng thử lại sau.' });
    }
  });
  
export default router;
