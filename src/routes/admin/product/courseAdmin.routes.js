import express from 'express';
import courseAdminService from '../../../services/admin/product/courseAdmin.service.js';

const router = express.Router();

// Lấy thông tin khóa học
router.get('/load', async (req, res) => {
  try {
    const courses = await courseAdminService.getAllCourse();
    console.log("Thông tin khóa học:", courses);
    res.status(200).json(courses);
  } catch (error) {
    console.error("Lỗi khi lấy thông tin khóa học:", error);
    res.status(500).json({ error: 'Không thể lấy thông tin khóa học' });
  }
});

// Thêm khóa học mới
router.post('/add', async (req, res) => {
  try {
    const { productName, price, description, imgUrl, lecturesName, completionTime } = req.body;
    
    const result = await courseAdminService.addCourse({
      productName,
      price,
      description,
      imgUrl,
      lecturesName,
      completionTime,
    });

    res.status(201).json({ message: 'Thêm khóa học thành công', result });
  } catch (error) {
    console.error("Lỗi khi thêm khóa học:", error);
    res.status(500).json({ error: 'Không thể thêm khóa học' });
  }
});

// Cập nhật thông tin khóa học
router.post('/update', async (req, res) => {
  try {
    const { id, lecturesName, completionTime, productName, price, description, imgUrl } = req.body;

    const result = await courseAdminService.updateCourse(id, {
      lecturesName,
      completionTime,
      productName,
      price,
      description,
      imgUrl,
    });

    res.status(200).json({ message: 'Cập nhật thông tin thành công', result });
  } catch (error) {
    console.error("Lỗi khi cập nhật khóa học:", error);
    res.status(500).json({ error: 'Không thể cập nhật khóa học' });
  }
});

// Xóa thông tin khóa học
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await courseAdminService.deleteCourse(id);
    res.status(200).json({ message: 'Xóa thông tin khóa học thành công', result });
  } catch (error) {
    console.error("Lỗi khi xoá khóa học:", error);
    res.status(500).json({ error: 'Không thể xoá thông tin khóa học' });
  }
});

export default router;
