-- AlterTable
ALTER TABLE "Song" ADD COLUMN     "analyzedAt" TIMESTAMP(3),
ADD COLUMN     "analyzedBpm" INTEGER,
ADD COLUMN     "bassEnergy" DOUBLE PRECISION,
ADD COLUMN     "beatCount" INTEGER,
ADD COLUMN     "beatTimestamps" JSONB,
ADD COLUMN     "midEnergy" DOUBLE PRECISION,
ADD COLUMN     "peak" DOUBLE PRECISION,
ADD COLUMN     "rms" DOUBLE PRECISION,
ADD COLUMN     "trebleEnergy" DOUBLE PRECISION,
ADD COLUMN     "waveformPeaks" JSONB;

-- CreateTable
CREATE TABLE "ListenHistory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "songId" TEXT NOT NULL,
    "playedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "durationMs" INTEGER,
    "bpm" INTEGER,
    "visualizerStyle" TEXT,

    CONSTRAINT "ListenHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ListenHistory_userId_playedAt_idx" ON "ListenHistory"("userId", "playedAt");

-- CreateIndex
CREATE INDEX "ListenHistory_songId_idx" ON "ListenHistory"("songId");

-- AddForeignKey
ALTER TABLE "ListenHistory" ADD CONSTRAINT "ListenHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListenHistory" ADD CONSTRAINT "ListenHistory_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;
