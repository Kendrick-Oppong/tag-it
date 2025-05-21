/*
  Warnings:

  - You are about to drop the column `revisitAt` on the `Bookmark` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "bookmark_revisitAt_idx";

-- AlterTable
ALTER TABLE "Bookmark" DROP COLUMN "revisitAt";
