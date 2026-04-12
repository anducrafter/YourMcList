/*
  Warnings:

  - You are about to drop the column `versionMajor` on the `McServer` table. All the data in the column will be lost.
  - You are about to drop the column `versionMinor` on the `McServer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "McServer" DROP COLUMN "versionMajor",
DROP COLUMN "versionMinor",
ADD COLUMN     "version" DOUBLE PRECISION;
