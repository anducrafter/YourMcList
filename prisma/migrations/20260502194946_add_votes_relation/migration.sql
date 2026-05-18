/*
  Warnings:

  - A unique constraint covering the columns `[servername]` on the table `McServer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Vote" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "serverId" TEXT,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Vote_serverId_username_createdAt_idx" ON "Vote"("serverId", "username", "createdAt");

-- CreateIndex
CREATE INDEX "Vote_serverId_ipAddress_createdAt_idx" ON "Vote"("serverId", "ipAddress", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "McServer_servername_key" ON "McServer"("servername");

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "McServer"("serverid") ON DELETE CASCADE ON UPDATE CASCADE;
