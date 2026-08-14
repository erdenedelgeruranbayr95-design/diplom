-- Эмчилгээний домэйныг бүрэн буулгана: THERAPIST · PARENT дүр, тэдгээрт
-- хамаарах TherapySession · Progress · TherapistAssignment · ParentLink хүснэгт.
-- Систем нь хөгжмийн платформ болж төрөлжсөн тул (USER · ARTIST · CURATOR ·
-- MODERATOR · ADMIN · ROOT) эдгээр хэсэг ашиглагдахаа больсон.

-- 1) Үлдсэн эмч/эцэг эхийн бүртгэлийг энгийн хэрэглэгч болгож бууруулна.
--    (Enum утга устгахын өмнө тухайн утгыг ашигласан мөр үлдэх ёсгүй.)
UPDATE "User" SET "role" = 'USER' WHERE "role" IN ('THERAPIST', 'PARENT');

-- 2) Домэйны хүснэгтүүд. Progress нь TherapySession-оос хамаардаг тул эхэлж түүнийг.
DROP TABLE IF EXISTS "Progress";
DROP TABLE IF EXISTS "TherapySession";
DROP TABLE IF EXISTS "TherapistAssignment";
DROP TABLE IF EXISTS "ParentLink";

-- 3) Зөвхөн TherapySession дээр ашиглагдаж байсан enum.
DROP TYPE IF EXISTS "SessionStatus";

-- 4) Role enum-оос THERAPIST · PARENT-ыг хасна. PostgreSQL enum-ийн утгыг шууд
--    устгаж чаддаггүй тул төрлийг дахин үүсгэж баганыг шилжүүлнэ.
ALTER TYPE "Role" RENAME TO "Role_old";

CREATE TYPE "Role" AS ENUM ('ROOT', 'ADMIN', 'CURATOR', 'MODERATOR', 'ARTIST', 'USER');

ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role" USING ("role"::text::"Role");
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'USER';

DROP TYPE "Role_old";
