### Schema

DROP DATABASE IF EXISTS sequelizedBurgers_db;
CREATE DATABASE sequelizedBurgers_db;

USE sequelizedBurgers_db;

CREATE TABLE burgers (
    id INTEGER(11) AUTO_INCREMENT NOT NULL,
    creator VARCHAR(50),
    burgername VARCHAR(50),
    devoured BOOLEAN NOT NULL DEFAULT 0,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);
