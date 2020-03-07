CREATE TABLE categories (
    id int AUTO_INCREMENT,
    name varchar(255),
    PRIMARY KEY (id)
);

CREATE TABLE subcategories (
    id int AUTO_INCREMENT,
    name varchar(255),
    category int,
    PRIMARY KEY (id)
);