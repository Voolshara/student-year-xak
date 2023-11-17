/*
  Warnings:

  - Made the column `title` on table `Thread` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Thread" ALTER COLUMN "title" SET NOT NULL;
