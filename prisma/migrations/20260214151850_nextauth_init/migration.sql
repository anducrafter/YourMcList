/*
  Warnings:

  - The `version` column on the `McServer` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "McServer" DROP COLUMN "version",
ADD COLUMN     "version" DOUBLE PRECISION;
