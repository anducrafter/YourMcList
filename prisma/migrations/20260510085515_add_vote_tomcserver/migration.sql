-- AlterTable
ALTER TABLE "McServer" ADD COLUMN     "voteip" TEXT,
ADD COLUMN     "votekey" TEXT,
ADD COLUMN     "voteport" INTEGER NOT NULL DEFAULT 8192;
