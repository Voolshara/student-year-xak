/*
  Warnings:

  - You are about to drop the column `state` on the `Thread` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Thread" DROP COLUMN "state",
ADD COLUMN     "state_done" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "state_error" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "state_none" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "state_skip" INTEGER NOT NULL DEFAULT 0;
