-- CreateEnum
CREATE TYPE "Role" AS ENUM ('user', 'admin');

-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('google', 'github', 'local');

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'user',
    "provider" "Provider" NOT NULL DEFAULT 'local',
    "is_verified_email" BOOLEAN NOT NULL DEFAULT false,
    "tel" TEXT,
    "username" TEXT,
    "refresh_token" TEXT,
    "password" TEXT,
    "soft_delete_date" TIMESTAMP(3),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_tel_key" ON "user"("tel");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");
