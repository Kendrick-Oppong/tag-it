/*
  Warnings:

  - A unique constraint covering the columns `[userId,name,parentId]` on the table `Collection` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Collection_userId_name_parentId_key" ON "Collection"("userId", "name", "parentId");
