-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'ARTIST';

-- AlterTable: уран бүтээлчийн баталгаажуулалт
ALTER TABLE "Artist" ADD COLUMN     "approved" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "approvedAt" TIMESTAMP(3);

-- Одоо байгаа дуучид (Jamendo/FMA импортоор үүссэн, эзэнгүй) баталгаажсан гэж
-- үзнэ — тэдгээр нь каталогийн ажилтны оруулсан контент, шалгалт шаардахгүй.
UPDATE "Artist" SET "approved" = true, "approvedAt" = CURRENT_TIMESTAMP WHERE "ownerId" IS NULL;

-- CreateTable
CREATE TABLE "Album" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "coverUrl" TEXT,
    "year" INTEGER,
    "artistId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Album_artistId_idx" ON "Album"("artistId");

-- CreateIndex
CREATE UNIQUE INDEX "Album_artistId_title_key" ON "Album"("artistId", "title");

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AlterTable: дууны цомгийн харьяалал ба дараалал
ALTER TABLE "Song" ADD COLUMN     "albumId" TEXT,
ADD COLUMN     "trackNumber" INTEGER;

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE SET NULL ON UPDATE CASCADE;
