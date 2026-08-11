-- AlterTable
ALTER TABLE "Artist" ADD COLUMN     "ownerId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Artist_ownerId_key" ON "Artist"("ownerId");

-- AddForeignKey
ALTER TABLE "Artist" ADD CONSTRAINT "Artist_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
