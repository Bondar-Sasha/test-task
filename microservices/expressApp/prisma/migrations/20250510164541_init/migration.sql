-- CreateEnum
CREATE TYPE "Role" AS ENUM ('user', 'admin');

-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('google', 'github', 'local');

-- CreateTable
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
