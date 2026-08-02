-- CreateEnum
CREATE TYPE "SongLicense" AS ENUM ('CC_BY', 'CC_BY_SA', 'CC_BY_NC', 'CC0', 'ORIGINAL', 'LICENSED');

-- AlterTable
ALTER TABLE "Song" ADD COLUMN     "jamendoId" TEXT,
ADD COLUMN     "license" "SongLicense",
ADD COLUMN     "licenseSrc" TEXT,
ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "publishedAt" TIMESTAMP(3),
ADD COLUMN     "uploadConfirmed" BOOLEAN NOT NULL DEFAULT true;

-- CreateIndex
CREATE INDEX "Song_published_idx" ON "Song"("published");

-- Одоо байгаа (migration-оос өмнөх) бүх дуу нийтэд аль хэдийн харагдаж байсан тул
-- шинэ published=false default-ыг тэдэнд нөлөөлөхгүй болгож нийтэлсэн гэж тэмдэглэнэ.
-- Мөн ORIGINAL лиценз оноож "лицензгүй дуу upload хийгдэхгүй" гэсэн DoD-ийг
-- цаашид зөрчихгүй тавьсан анхны өгөгдөл болгоно (шинэ upload-д Curator/uploader зөв
-- лиценз сонгох ёстой ч, миграцийн үед хуучин мөрүүд NULL license-тэй үлдэхгүй байх).
UPDATE "Song" SET "published" = true, "license" = 'ORIGINAL' WHERE "license" IS NULL;
