import db from '../utils/db.js';
export default {
    getAllCoffeeBag: async () => {
      try {
        const rows = await db('coffee_bag')
          .leftJoin('product', 'coffee_bag.productId', 'product.productId')
          .select(
            'coffee_bag.*',
            'product.productName',
            'product.price',
            'product.description',
            'product.imgUrl'
          );
  
        return rows;
      } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
      }
    },
};