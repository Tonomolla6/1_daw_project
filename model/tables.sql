CREATE TABLE products (
    id int AUTO_INCREMENT,
    name varchar(255),
    description varchar(255),
    stock int,
    purchase_price varchar(255),
	sale_price varchar(255),
    gain varchar(255),
    img varchar(255),
    provider varchar(255),
    category varchar(255),
    subcategory varchar(255),
	clicks int,
    PRIMARY KEY (id)
);