import express from 'express';
import coffeeAdminService from '../../../services/admin/product/coffeeAdmin.service.js';
const router = express.Router();  

router.get('/load', async (req, res) => {
    try {
      const products = await coffeeAdminService.getAllCoffeeBag();
      console.log(products)
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: 'Không thể lấy thông tin sản phẩm' });
    }
  });
  router.post('/update', async (req, res) => {
    try {
      const { id, origin, expirationDate, productionDate, productName, price, description, imgUrl } = req.body;
      console.log("id update", id);
      
      const result = await coffeeAdminService.updatecoffeeBag(id, {
        origin,
        expirationDate,
        productionDate,
        productName,
        price,
        description,
        imgUrl,
      });
  
      res.status(200).json({ message: 'Cập nhật thông tin thành công', result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Không thể cập nhật thông tin' });
    }
  });
  router.post('/add', async (req, res) => {
    try {
      const { productId, productName, price, description, imgUrl, origin, productionDate, expirationDate } = req.body;
   
      const result = await coffeeAdminService.addCoffeeBag({
        productId,
        productName,
        price,
        description,
        imgUrl,
        origin,
        productionDate,
        expirationDate,
      });
  
      res.status(200).json({ message: 'Thêm thông tin thành công', result });
    } catch (error) {
      console.error('Error adding coffee bag:', error);
      res.status(500).json({ error: 'Không thể thêm thông tin cà phê' });
    }
  });
  
  // Xóa thông tin cà phê
  router.delete('/delete/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const result = await coffeeAdminService.deleteCoffeeBag(id);
      res.status(200).json({ message: 'Xóa thông tin thành công', result });
    } catch (error) {
      res.status(500).json({ error: 'Không thể xoá thông tin sản phẩm' });
    }
  });
export default router;