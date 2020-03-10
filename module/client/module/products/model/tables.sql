CREATE TABLE categories (
    id int AUTO_INCREMENT,
    name varchar(255),
    clicks int,
    PRIMARY KEY (id)
);

CREATE TABLE subcategories (
    id int AUTO_INCREMENT,
    name varchar(255),
    category int,
    clicks int,
    PRIMARY KEY (id)
);