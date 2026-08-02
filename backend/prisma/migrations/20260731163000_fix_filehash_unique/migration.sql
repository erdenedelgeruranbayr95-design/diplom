-- DropIndex
DROP INDEX "Song_fileHash_key";

-- CreateIndex
CREATE INDEX "Song_fileHash_idx" ON "Song"("fileHash");
