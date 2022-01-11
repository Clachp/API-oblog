-- Deploy oblog:init to pg
BEGIN;

DROP TABLE IF EXISTS "post", "category", "post_has_category" ;
CREATE TABLE category (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "route" TEXT NOT NULL UNIQUE,
    label TEXT NOT NULL UNIQUE
);

CREATE TABLE post (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL UNIQUE,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    category_id INT NOT NULL REFERENCES category(id)
);

COMMIT;
