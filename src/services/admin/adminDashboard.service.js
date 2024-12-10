import db from '../../utils/db.js';
export default {
    getDashboardData: async () => {
        try {
          const [orders, revenueRows, coffeeBagRows, courseRows, userRows] = await Promise.all([
            db('order')
              .join('customer', 'order.customerId', 'customer.customerId')
              .select(
                'order.orderId',
                'order.orderDate',
                'order.quantity',
                'order.total',
                'order.lineItem',
                'order.status',
                'customer.name as customerName'
              ),
    
            db('order').sum('total as revenue').where('status', 1),
    
            db('coffee_bag').count('* as total'),
    
            db('course').count('* as total'),
    
            db('customer').count('* as total'),
          ]);
    
          return {
            orders,
            revenue: revenueRows[0]?.revenue || 0,
            coffeeBagCount: coffeeBagRows[0]?.total || 0,
            courseCount: courseRows[0]?.total || 0,
            userCount: userRows[0]?.total || 0,
          };
        } catch (error) {
          console.error('Error loading dashboard data:', error);
          throw error;
        }
      },
}