
-- Bảng customer
CREATE TABLE customer (
    customerId INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255),
    telNumber VARCHAR(12),
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);

-- Bảng product
CREATE TABLE product (
    productId INT AUTO_INCREMENT PRIMARY KEY,
    productName VARCHAR(255) NOT NULL,
    price DOUBLE NOT NULL,
    description LONGTEXT,
    imgUrl VARCHAR(255)
);

-- Bảng coffee_bag
CREATE TABLE coffee_bag (
    productId INT PRIMARY KEY,
    origin VARCHAR(100),
    expirationDate DATE,
    productionDate DATE,
    FOREIGN KEY (productId) REFERENCES product(productId)
);

-- Bảng course
CREATE TABLE course (
    productId INT PRIMARY KEY,
    lecturesName VARCHAR(255),
    completionTime DATE,
    FOREIGN KEY (productId) REFERENCES product(productId)
);

-- Bảng order
CREATE TABLE `order` (
    orderId INT AUTO_INCREMENT PRIMARY KEY,
    customerId INT NOT NULL,
    orderDate DATETIME NOT NULL,
    quantity INT NOT NULL,
    total DOUBLE NOT NULL,
    lineItem INT,
    status TINYINT NOT NULL,
    FOREIGN KEY (customerId) REFERENCES customer(customerId)
);

-- Bảng lineItem
CREATE TABLE lineItem (
    orderId INT NOT NULL,
    productId INT NOT NULL,
    quantity INT NOT NULL,
    subtotal DOUBLE NOT NULL,
    PRIMARY KEY (orderId, productId),
    FOREIGN KEY (orderId) REFERENCES `order`(orderId),
    FOREIGN KEY (productId) REFERENCES product(productId)
);
