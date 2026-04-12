/*
  Warnings:

  - You are about to drop the column `serverId` on the `McServerHistory` table. All the data in the column will be lost.
  - Added the required column `serverid` to the `McServerHistory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "McServerHistory" DROP CONSTRAINT "McServerHistory_serverId_fkey";

-- DropIndex
DROP INDEX "McServerHistory_serverId_checkedAt_idx";

-- AlterTable
ALTER TABLE "McServer" ADD COLUMN     "icon" TEXT;

-- AlterTable
ALTER TABLE "McServerHistory" DROP COLUMN "serverId",
ADD COLUMN     "serverid" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "McServerHistory_serverid_checkedAt_idx" ON "McServerHistory"("serverid", "checkedAt");

-- AddForeignKey
ALTER TABLE "McServerHistory" ADD CONSTRAINT "McServerHistory_serverid_fkey" FOREIGN KEY ("serverid") REFERENCES "McServer"("serverid") ON DELETE CASCADE ON UPDATE CASCADE;
