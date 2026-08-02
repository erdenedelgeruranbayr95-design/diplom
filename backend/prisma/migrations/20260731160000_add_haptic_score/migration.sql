-- CreateEnum
CREATE TYPE "SongAnalysisStatus" AS ENUM ('PENDING', 'PROCESSING', 'READY', 'FAILED');

-- AlterTable
ALTER TABLE "Song" ADD COLUMN     "analysisError" TEXT,
ADD COLUMN     "analysisStatus" "SongAnalysisStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "fileHash" TEXT,
ADD COLUMN     "musicalKey" TEXT,
ADD COLUMN     "scoreUrl" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Song_fileHash_key" ON "Song"("fileHash");
