-- Verify oblog-sqitch:correction on pg

BEGIN;

SELECT * FROM category WHERE false;
SELECT * FROM post WHERE false;

ROLLBACK;
