import db from '../utils/db.js';
export default {
    getAllCourses: async () => {
        try {
          const rows = await db('course')
            .leftJoin('product', 'course.productId', 'product.productId')
            .select(
              'course.productId',
              'course.lecturesName',
              'course.completionTime',
              'product.productName',
              'product.price',
              'product.description',
              'product.imgUrl'
            );
    
          return rows;
        } catch (error) {
          console.error('Error fetching courses:', error);
          throw error;
        }
      },
};