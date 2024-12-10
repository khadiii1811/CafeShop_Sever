import db from '../utils/db.js';
export default {
    saveOrder: async (userId, cartItems, subtotal) => {
        try {
          // Insert vào bảng 'order'
          const [orderId] = await db('order').insert({
            customerId: userId,
            orderDate: new Date(),
            quantity: cartItems.length,
            total: subtotal,
            status: 1,
          });
    
          // Insert các mục trong giỏ hàng vào 'lineItem'
          const lineItemPromises = cartItems.map(item =>
            db('lineItem').insert({
              orderId: orderId,
              productId: item.productId,
              quantity: item.quantity,
              subtotal: item.price * item.quantity,
            })
          );
    
          await Promise.all(lineItemPromises);
    
          return { success: true, orderId };
        } catch (error) {
          console.error('Error saving order:', error);
          throw error;
        }
      },
      
};