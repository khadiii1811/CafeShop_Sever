import db from '../../../utils/db.js';

export default {
  getAllCourse: async () => {
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
  addCourse: async (data) => {
    let transaction;
    try {
      console.log('Thêm khóa học với dữ liệu:', data);

      transaction = await db.transaction();

      const productInsertResult = await transaction('product')
        .insert({
          productName: data.productName,
          price: data.price,
          description: data.description,
          imgUrl: data.imgUrl,
        })
        .returning('productId');

      console.log('Kết quả thêm sản phẩm:', productInsertResult);

      if (!productInsertResult || productInsertResult.length === 0) {
        throw new Error('Không thể thêm sản phẩm');
      }

      const productId = productInsertResult[0];

      const courseInsertResult = await transaction('course').insert({
        productId: productId,
        lecturesName: data.lecturesName,
        completionTime: data.completionTime,
      });

      console.log('Kết quả thêm thông tin khóa học:', courseInsertResult);

      await transaction.commit();
      console.log('Thêm khóa học thành công');
      return { message: 'Thêm khóa học thành công' };
    } catch (error) {
      console.error('Lỗi khi thêm khóa học:', error);

      if (transaction) {
        await transaction.rollback();
      }
      throw error;
    }
  },
  updateCourse: async (id,updateData) => {
    try {
      console.log('Dữ liệu cập nhật:', updateData);

      await db('course')
        .where({ productId: id })
        .update({
          lecturesName: updateData.lecturesName,
          completionTime: updateData.completionTime,
        });

      await db('product')
        .where({ productId: id })
        .update({
          productName: updateData.productName,
          price: updateData.price,
          description: updateData.description,
          imgUrl: updateData.imgUrl,
        });

      console.log('Cập nhật khóa học thành công');
      return { message: 'Cập nhật khóa học thành công' };
    } catch (error) {
      console.error('Lỗi khi cập nhật khóa học:', error);
      throw error;
    }
  },
  deleteCourse: async (id) => {
    try {
      console.log('Xóa thông tin khóa học và sản phẩm với ID:', id);

      await db('course')
        .where({ productId: id })
        .del();

      await db('product')
        .where({ productId: id })
        .del();

      console.log('Xóa khóa học và sản phẩm thành công');
      return { message: 'Xóa khóa học thành công' };
    } catch (error) {
      console.error('Lỗi khi xóa khóa học:', error);
      throw error;
    }
  },
}; 
