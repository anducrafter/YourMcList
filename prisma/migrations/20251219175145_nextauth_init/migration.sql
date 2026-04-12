/*
  Warnings:

  - The primary key for the `McServer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `McServer` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `McServer` table. All the data in the column will be lost.
  - You are about to drop the column `owner` on the `McServer` table. All the data in the column will be lost.
  - You are about to drop the `McServerCurrent` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `bedrock` to the `McServer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cheked` to the `McServer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `config` to the `McServer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `servercountry` to the `McServer` table without a default value. This is not possible if the table is not empty.
  - The required column `serverid` was added to the `McServer` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `servername` to the `McServer` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `McServer` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "McServer" DROP CONSTRAINT "McServer_id_fkey";

-- DropForeignKey
ALTER TABLE "McServerCurrent" DROP CONSTRAINT "McServerCurrent_serverId_fkey";

-- DropForeignKey
ALTER TABLE "McServerHistory" DROP CONSTRAINT "McServerHistory_serverId_fkey";

-- AlterTable
ALTER TABLE "McServer" DROP CONSTRAINT "McServer_pkey",
DROP COLUMN "id",
DROP COLUMN "name",
DROP COLUMN "owner",
ADD COLUMN     "approved" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "bedrock" BOOLEAN NOT NULL,
ADD COLUMN     "cheked" TEXT NOT NULL,
ADD COLUMN     "config" TEXT NOT NULL,
ADD COLUMN     "discord" TEXT,
ADD COLUMN     "instagram" TEXT,
ADD COLUMN     "servercountry" TEXT NOT NULL,
ADD COLUMN     "serverid" TEXT NOT NULL,
ADD COLUMN     "servername" TEXT NOT NULL,
ADD COLUMN     "ticktock" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "youtube" TEXT,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "website" DROP NOT NULL,
ADD CONSTRAINT "McServer_pkey" PRIMARY KEY ("serverid");

-- DropTable
DROP TABLE "McServerCurrent";

-- AddForeignKey
ALTER TABLE "McServer" ADD CONSTRAINT "McServer_serverid_fkey" FOREIGN KEY ("serverid") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "McServerHistory" ADD CONSTRAINT "McServerHistory_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "McServer"("serverid") ON DELETE CASCADE ON UPDATE CASCADE;
