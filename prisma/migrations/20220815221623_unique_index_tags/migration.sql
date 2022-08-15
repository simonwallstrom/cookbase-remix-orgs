/*
  Warnings:

  - A unique constraint covering the columns `[organizationId,title]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Tag_organizationId_title_key" ON "Tag"("organizationId", "title");
