DROP DATABASE IF EXISTS bamazondb;

CREATE DATABASE bamazondb;

USE bamazondb;

CREATE TABLE products(
    item_id INT AUTO_INCREMENT NOT NULL, 
    product_name VARCHAR(30), 
    department_name VARCHAR(30), 
    price DECIMAL(10,2),
    stock_quantity INT,
    PRIMARY KEY(item_id)
    );

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE("cars", "toys", 1.50, 125);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE("soap", "household", 3.00, 20);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE("chair", "furniture", 50.00, 25);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE("cup", "kitchen", 4.50, 12);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE("baseball", "sports", 4.00, 32);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE("hat", "clothing", 12.00, 22);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE("jeans_m", "clothing", 18.00, 30);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE("jeans_f", "clothing", 22.00, 45);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE("table", "furniture", 375.00, 12);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE("computer", "electronics", 399.00, 20);



