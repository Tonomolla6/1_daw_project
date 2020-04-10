CREATE TABLE orders (
    id int AUTO_INCREMENT,
    user int,
    product int,
    units int,
    PRIMARY KEY (id)
);

CREATE TABLE cart (
    id int AUTO_INCREMENT,
    user int,
    product int,
    units int,
    PRIMARY KEY (id)
);