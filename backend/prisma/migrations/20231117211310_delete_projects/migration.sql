/*
  Warnings:

  - You are about to drop the column `projectId` on the `Thread` table. All the data in the column will be lost.
  - You are about to drop the `Projects` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProjectsToUsers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Thread" DROP CONSTRAINT "Thread_projectId_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectsToUsers" DROP CONSTRAINT "_ProjectsToUsers_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectsToUsers" DROP CONSTRAINT "_ProjectsToUsers_B_fkey";

-- AlterTable
ALTER TABLE "Thread" DROP COLUMN "projectId",
ADD COLUMN     "creation_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "Projects";

-- DropTable
DROP TABLE "_ProjectsToUsers";
