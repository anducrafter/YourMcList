/*
  Warnings:

  - Added the required column `userId` to the `McServer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "McServer" DROP CONSTRAINT "McServer_serverid_fkey";

-- AlterTable
ALTER TABLE "McServer" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "McServer" ADD CONSTRAINT "McServer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
