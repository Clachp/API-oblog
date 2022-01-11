-- Deploy oblog-sqitch:init to pg

BEGIN;

-- Fichier init.sql chargé dans psql avant déploiement (psql -U postgres -d oblog -f ./init.slq): obligé de droper les tables avant
-- Est-ce une pratique risquée ? 
DROP TABLE IF EXISTS "post", "category", "post_has_category" ; 
CREATE TABLE post (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    category TEXT NOT NULL,
    slug TEXT NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL
);

CREATE TABLE category (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "route" TEXT NOT NULL,
    label TEXT NOT NULL 
);

CREATE TABLE post_has_category (
    "post_id" INT NOT NULL REFERENCES "post"("id") ON DELETE CASCADE,
    "category_id" INT NOT NULL REFERENCES "category"("id") ON DELETE CASCADE,
     PRIMARY KEY("post_id", "category_id")
);


COMMIT;
