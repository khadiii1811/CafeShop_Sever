SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS lineItem;
DROP TABLE IF EXISTS `order`;
DROP TABLE IF EXISTS coffee_bag;
DROP TABLE IF EXISTS course;
DROP TABLE IF EXISTS product;
DROP TABLE IF EXISTS customer;
SET FOREIGN_KEY_CHECKS = 1;






---------=-------------------

INSERT INTO customer (customerId, name, address, telNumber, email, password) VALUES
(1, 'Nguyen Van A', '123 Le Loi, Hanoi', '0123456789', 'vana@gmail.com', 'hashed_password1'),
(2, 'Tran Thi B', '456 Nguyen Trai, HCMC', '0987654321', 'thib@gmail.com', 'hashed_password2'),
(3, 'Le Hoang C', '789 Hai Ba Trung, Da Nang', '0912345678', 'hoangc@gmail.com', 'hashed_password3');

INSERT INTO product (productId, productName, price, description, imgUrl) VALUES
(1, 'DRIP BAG', 25000, 'Premium Arabica coffee beans.', 'assets/Lets/columbia.png'),
(2, 'DRIP BAG', 25000, 'Strong and bold Robusta coffee.', 'assets/Lets/kenya.png'),
(3, 'DRIP BAG', 25000, 'High-quality espresso machine.', 'assets/Lets/ethi.png'),
(4, 'Handdrew', 5000000, 'Khóa học này cho ta tiếp cận đến những kiểu pha cà phê thủ công. Tiêu hiểu về các loại cà phê đặc sản ở các nước khác.', 'assets/Lets/handdrew.jpg'),
(5, 'Giới thiệu căn bản về cà phê', 1000000, 'High-quality espresso machine.', 'assets/Lets/img_1.png'),
(6, 'Latte Art', 7000000, 'Khóa Latte Art đào tạo kỹ thuật tạo hình cà phê chuyên nghiệp, dành cho barista muốn nâng cao tay nghề.', 'assets/Lets/img.png');


INSERT INTO coffee_bag (productId, origin, expirationDate, productionDate) VALUES
(1, 'Colombia', '2024-12-31', '2023-01-01'),
(2, 'Kenya', '2025-06-30', '2023-06-01'),
(3, 'Ethiopia', '2024-09-15', '2022-09-15');


INSERT INTO course (productId, lecturesName, completionTime) VALUES
(4, 'Nguyễn Hoàng Giang Nam', '2025-05-15'),
(5, 'Nguyễn Hoàng Giang Nam', '2025-06-20'),
(6, 'Nguyễn Hoàng Giang Nam', '2025-07-25');


INSERT INTO `order` (orderId, customerId, orderDate, quantity, total, lineItem, status) VALUES
(1, 1, '2024-01-01 10:30:00', 2, 400000, 1, 1),
(2, 2, '2024-02-15 14:45:00', 1, 150000, 1, 0),
(3, 3, '2024-03-20 08:20:00', 3, 600000, 1, 1);

INSERT INTO lineItem (orderId, productId, quantity, subtotal) VALUES
(1, 1, 2, 400000),
(2, 2, 1, 150000),
(3, 1, 1, 200000),
(3, 3, 2, 10000000);
