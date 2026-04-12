/*
  Warnings:

  - You are about to drop the column `version` on the `McServer` table. All the data in the column will be lost.
  - Added the required column `versionMajor` to the `McServer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `versionMinor` to the `McServer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "McServer" DROP COLUMN "version",
ADD COLUMN     "versionMajor" INTEGER NOT NULL,
ADD COLUMN     "versionMinor" INTEGER NOT NULL;
