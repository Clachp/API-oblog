-- Verify oblog-sqitch:init on pg

BEGIN;

SELECT * FROM post WHERE false;
SELECT * FROM category WHERE false;
SELECT * FROM post_has_category WHERE false; 

ROLLBACK;
