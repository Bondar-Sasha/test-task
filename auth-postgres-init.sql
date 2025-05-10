CREATE TYPE "Role" AS ENUM ('user', 'admin');

CREATE TYPE "Provider" AS ENUM ('google', 'github', 'local');

CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'user',
    "provider" "Provider" NOT NULL DEFAULT 'local',
    "is_verified_email" BOOLEAN NOT NULL DEFAULT false,
    "refresh_token" TEXT,
    "password" TEXT,
    "soft_delete_date" TIMESTAMP(3),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

CREATE OR REPLACE FUNCTION clean_deleted_users()
RETURNS VOID AS $$
BEGIN
    DELETE FROM "user"
    WHERE soft_delete_date IS NOT NULL
    AND soft_delete_date <= (NOW() - INTERVAL '1 month');
END;
$$ LANGUAGE plpgsql;