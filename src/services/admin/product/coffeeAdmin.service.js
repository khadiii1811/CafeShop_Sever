import db from '../../../utils/db.js';
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
      addCoffeeBag: async (data) => {
        let transaction;
        try {
          console.log('Dữ liệu được truyền vào:', data);
      
          // Bắt đầu Transaction
          transaction = await db.transaction();
      
          // Thêm thông tin vào bảng `product`
          const productInsertResult = await transaction('product')
            .insert({
              productId: data.productId,
              productName: data.productName,
              price: data.price,
              description: data.description,
              imgUrl: data.imgUrl,
            })
            .returning('productId');
      
          console.log('Kết quả sau khi insert vào product:', productInsertResult);
      
          if (!productInsertResult || productInsertResult.length === 0) {
            throw new Error("Không thể thêm thông tin sản phẩm mới");
          }
      
          const productId = productInsertResult[0];
      
          // Thêm thông tin vào coffee_bag
          const coffeeBagInsertResult = await transaction('coffee_bag').insert({
            productId: productId,
            origin: data.origin,
            productionDate: data.productionDate,
            expirationDate: data.expirationDate,
          });
      
          console.log('Kết quả sau khi insert vào coffee_bag:', coffeeBagInsertResult);
      
          // Commit transaction nếu mọi thứ đều OK
          await transaction.commit();
          console.log("Thêm thông tin thành công");
      
          return { message: 'Thêm thông tin thành công' };
        } catch (error) {
          console.error('Lỗi khi thêm thông tin cà phê:', error);
      
          // Rollback nếu xảy ra lỗi
          if (transaction) {
            await transaction.rollback();
          }
      
          throw error;
        }
      },
    
      deleteCoffeeBag: async (id) => {
        try {
          await db('coffee_bag')
            .where({ productId: id })
            .del();
          await db('product')
            .where({ productId: id })
            .del(); 
          console.log(`Đã xóa thông tin cà phê với ID: ${id}`);
          return { message: 'Xóa thành công' };
        } catch (error) {
          console.error('Error deleting coffee bag:', error);
          throw error;
        }
      },
      updatecoffeeBag: async (id, updateData) => {
        try {
          await db('coffee_bag')
            .where({ productId: id })
            .update({
              origin: updateData.origin,
              expirationDate: updateData.expirationDate,
              productionDate: updateData.productionDate,
            });
          
          await db('product')
            .where({ productId: id })
            .update({
              productName: updateData.productName,
              price: updateData.price,
              description: updateData.description,
              imgUrl: updateData.imgUrl,
            });
    
          console.log(`Cập nhật thông tin cà phê thành công với ID: ${id}`);
          return { message: 'Cập nhật thành công' };
        } catch (error) {
          console.error('Error updating coffee bag:', error);
          throw error;
        }
      },
};