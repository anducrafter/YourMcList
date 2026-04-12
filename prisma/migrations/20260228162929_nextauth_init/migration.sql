/*
  Warnings:

  - You are about to drop the column `version` on the `McServer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "McServer" DROP COLUMN "version",
ADD COLUMN     "versionMajor" INTEGER,
ADD COLUMN     "versionMinor" INTEGER;
