-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "isFeatured" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "isFeatured" BOOLEAN NOT NULL DEFAULT true;
