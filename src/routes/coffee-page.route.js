import express from 'express';
import productService from'../services/coffee-page.service.js';
const router = express.Router();  

router.get('/coffee', async (req, res) => {
    try {
      const products = await productService.getAllCoffeeBag();
      console.log(products)
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: 'Không thể lấy thông tin sản phẩm' });
    }
  });
export default router;
