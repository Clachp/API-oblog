-- Revert oblog-sqitch:correction from pg

BEGIN;

DROP TABLE post, category;

COMMIT;
