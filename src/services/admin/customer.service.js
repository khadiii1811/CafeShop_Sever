import db from '../../utils/db.js';
export default {
    getAllCustomer: async () => {
        try {
          const rows = await db('customer'); // Truy vấn tất cả thông tin từ bảng customer
          console.log('Rows from database:', rows);
          return rows;
        } catch (error) {
          console.error('Error fetching customers:', error);
          throw error;
        }
      },
      deleteCustomer: async (id) => {
        try {

          const orderIds = await db('order').where('customerId', id).pluck('orderId');
      
          // Xoá dữ liệu trong lineitem theo từng orderId
          for (const orderId of orderIds) {
            await db('lineitem').where('orderId', orderId).del();
          }
      
          // Xoá các đơn hàng liên quan
          await db('order').where('customerId', id).del();
      
          // Xoá khách hàng sau khi xoá các liên kết xong
          const result = await db('customer').where('customerId', id).del();
          return result;
        } catch (error) {
          console.error('Error deleting customer:', error);
          throw error;
        }
      },
};