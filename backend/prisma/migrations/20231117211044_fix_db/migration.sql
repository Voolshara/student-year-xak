/*
  Warnings:

  - You are about to drop the column `tread` on the `Reports` table. All the data in the column will be lost.
  - You are about to drop the `Tread` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `projects ` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tredId` to the `Reports` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Reports" DROP CONSTRAINT "Reports_tread_fkey";

-- DropForeignKey
ALTER TABLE "Tread" DROP CONSTRAINT "Tread_creator_fkey";

-- DropForeignKey
ALTER TABLE "Tread" DROP CONSTRAINT "Tread_executor_fkey";

-- DropForeignKey
ALTER TABLE "Tread" DROP CONSTRAINT "Tread_project_fkey";

-- DropForeignKey
ALTER TABLE "projects " DROP CONSTRAINT "projects _creator_fkey";

-- DropIndex
DROP INDEX "users_link_link1_key";

-- AlterTable
ALTER TABLE "Reports" DROP COLUMN "tread",
ADD COLUMN     "tredId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Tread";

-- DropTable
DROP TABLE "projects ";

-- CreateTable
CREATE TABLE "Projects" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "creation_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creator" INTEGER NOT NULL,

    CONSTRAINT "Projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Thread" (
    "id" SERIAL NOT NULL,
    "solverId" INTEGER,
    "creatorId" INTEGER NOT NULL,
    "title" VARCHAR(255),
    "comment" VARCHAR(255) NOT NULL,
    "projectId" INTEGER NOT NULL,
    "state" INTEGER NOT NULL DEFAULT 1,
    "tag" VARCHAR(255)[],
    "parentId" INTEGER,

    CONSTRAINT "Thread_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProjectsToUsers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectsToUsers_AB_unique" ON "_ProjectsToUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectsToUsers_B_index" ON "_ProjectsToUsers"("B");

-- AddForeignKey
ALTER TABLE "Reports" ADD CONSTRAINT "Reports_tredId_fkey" FOREIGN KEY ("tredId") REFERENCES "Thread"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Thread" ADD CONSTRAINT "Thread_solverId_fkey" FOREIGN KEY ("solverId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Thread" ADD CONSTRAINT "Thread_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Thread" ADD CONSTRAINT "Thread_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Thread" ADD CONSTRAINT "Thread_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Thread"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectsToUsers" ADD CONSTRAINT "_ProjectsToUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectsToUsers" ADD CONSTRAINT "_ProjectsToUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
