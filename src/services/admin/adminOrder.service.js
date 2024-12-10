import db from '../../utils/db.js';
export default {
  getAllOrder: async () => {
    try {
      // Truy vấn bảng order và join với bảng customer để lấy tên khách hàng
      const rows = await db('order')
        .join('customer', 'order.customerId', 'customer.customerId') // JOIN bảng order và customer
        .select(
          'order.orderId', 
          'order.orderDate', 
          'order.quantity', 
          'order.total', 
          'order.lineItem', 
          'order.status', 
          'customer.name as customerName' // Lấy tên khách hàng từ bảng customer
        );

      console.log('Rows from database:', rows); // Debug
      return rows;
    } catch (error) {
      console.error('Error fetching orders with customer names:', error);
      throw error;
    }
  },
}