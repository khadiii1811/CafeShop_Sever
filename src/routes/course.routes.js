import express from 'express';
import courseService from'../services/course.service.js';
const router = express.Router();  

router.get('/course', async (req, res) => {
    try {
      const courses = await courseService.getAllCourses();
      console.log(courses);
      res.status(200).json({
        success: true,
        data: courses,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Không thể load thông tin khóa học.',
        error: error.message,
      });
    }
  });
export default router;
