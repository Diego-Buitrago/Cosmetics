DROP TABLE IF EXISTS compras;

CREATE TABLE compras(
    id INT(5) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    numero_orden INT(50) UNSIGNED NOT NULL,
    fecha VARCHAR(50) NOT NULL,
    cliente VARCHAR(50) NOT NULL,
    subtotal INT(50) UNSIGNED NOT NULL,
    iva INT(50) UNSIGNED NOT NULL,
    total INT(50) UNSIGNED NOT NULL
);