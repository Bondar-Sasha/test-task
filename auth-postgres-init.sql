CREATE OR REPLACE FUNCTION clean_deleted_users()
RETURNS VOID AS $$
BEGIN
    DELETE FROM "user"
    WHERE soft_delete_date IS NOT NULL
    AND soft_delete_date <= (NOW() - INTERVAL '1 month');
END;
$$ LANGUAGE plpgsql;