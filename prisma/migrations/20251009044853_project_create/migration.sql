/*
  Warnings:

  - The values [USER] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `content` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('OWNER', 'ADMIN');
ALTER TABLE "public"."User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "public"."Role_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'OWNER';
COMMIT;

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "published" SET DEFAULT true;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "technologies" TEXT[],
ADD COLUMN     "views" INTEGER NOT NULL DEFAULT 0;
