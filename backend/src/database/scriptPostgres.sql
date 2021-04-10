CREATE DATABASE cosmetic;

DROP TABLE IF EXISTS compras;

CREATE TABLE compras(
    id SERIAL PRIMARY KEY,
    numero_orden INTEGER NOT NULL ,
    fecha VARCHAR(50) NOT NULL,
    cliente VARCHAR(50) NOT NULL,
    subtotal INTEGER NOT NULL,
    iva INTEGER NOT NULL,
    total INTEGER NOT NULL
);