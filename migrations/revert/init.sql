-- Revert oblog-sqitch:init from pg

BEGIN;

DROP TABLE post_has_category, category, post;

COMMIT;
