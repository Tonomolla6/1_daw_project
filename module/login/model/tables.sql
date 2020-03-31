CREATE TABLE login (
	id int AUTO_INCREMENT,
    name varchar(255),
    email varchar(255),
    password varchar(255),
	avatar varchar(255),
    salary int,
    type varchar(255),
    PRIMARY KEY (id)
);

INSERT INTO login (name, email, password, avatar, type)
VALUES ("Tono", "tono.iestacio@gmail.com", "123456","","admin");