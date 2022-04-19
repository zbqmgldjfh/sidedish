SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS category;

CREATE TABLE category
(
    id   BIGINT AUTO_INCREMENT,
    type VARCHAR(64),
    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS items;

CREATE TABLE items
(
    id            BIGINT AUTO_INCREMENT,
    category      BIGINT references category (id),
    category_key  BIGINT,
    title         VARCHAR(64)  NOT NULL,
    description   VARCHAR(255) NOT NULL,
    price         DECIMAL      NOT NULL,
    discount_rate DOUBLE,
    badge         VARCHAR(32),
    detail_type   VARCHAR(32),
    quantity      BIGINT       NOT NULL,
    reward_point  DECIMAL      NOT NULL,
    image         VARCHAR(64)  NOT NULL,
    PRIMARY KEY (id)
);

SET FOREIGN_KEY_CHECKS = 1;