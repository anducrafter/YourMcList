/*
  Warnings:

  - You are about to drop the column `latencyMs` on the `McServerHistory` table. All the data in the column will be lost.
  - You are about to drop the column `playersMax` on the `McServerHistory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "McServerHistory" DROP COLUMN "latencyMs",
DROP COLUMN "playersMax";
