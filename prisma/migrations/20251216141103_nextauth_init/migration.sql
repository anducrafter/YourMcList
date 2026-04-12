-- CreateTable
CREATE TABLE "McServer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "owner" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "McServer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "McServerCurrent" (
    "serverId" TEXT NOT NULL,
    "checkedAt" TIMESTAMP(3) NOT NULL,
    "online" BOOLEAN NOT NULL,
    "latencyMs" INTEGER,
    "playersOnline" INTEGER,
    "playersMax" INTEGER,
    "iconBase64" TEXT,
    "versionText" TEXT,

    CONSTRAINT "McServerCurrent_pkey" PRIMARY KEY ("serverId")
);

-- CreateTable
CREATE TABLE "McServerHistory" (
    "id" BIGSERIAL NOT NULL,
    "serverId" TEXT NOT NULL,
    "checkedAt" TIMESTAMP(3) NOT NULL,
    "online" BOOLEAN NOT NULL,
    "latencyMs" INTEGER,
    "playersOnline" INTEGER,
    "playersMax" INTEGER,
    "versionText" TEXT,

    CONSTRAINT "McServerHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "McServer_ip_key" ON "McServer"("ip");

-- CreateIndex
CREATE INDEX "McServerCurrent_checkedAt_idx" ON "McServerCurrent"("checkedAt");

-- CreateIndex
CREATE INDEX "McServerHistory_serverId_checkedAt_idx" ON "McServerHistory"("serverId", "checkedAt");

-- AddForeignKey
ALTER TABLE "McServer" ADD CONSTRAINT "McServer_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "McServerCurrent" ADD CONSTRAINT "McServerCurrent_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "McServer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "McServerHistory" ADD CONSTRAINT "McServerHistory_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "McServer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
