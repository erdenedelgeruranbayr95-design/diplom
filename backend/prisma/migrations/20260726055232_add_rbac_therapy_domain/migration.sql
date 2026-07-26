-- CreateEnum
CREATE TYPE "SessionStatus" AS ENUM ('SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "QRStatus" AS ENUM ('PENDING', 'CONNECTED', 'EXPIRED');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Role" ADD VALUE 'THERAPIST';
ALTER TYPE "Role" ADD VALUE 'PARENT';

-- CreateTable
CREATE TABLE "TherapistAssignment" (
    "id" TEXT NOT NULL,
    "therapistId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TherapistAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParentLink" (
    "id" TEXT NOT NULL,
    "parentId" TEXT NOT NULL,
    "childUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ParentLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Song" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "artist" TEXT,
    "genre" TEXT,
    "fileUrl" TEXT NOT NULL,
    "duration" INTEGER,
    "bpm" INTEGER,
    "uploadedBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Song_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TherapySession" (
    "id" TEXT NOT NULL,
    "therapistId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "songId" TEXT,
    "notes" TEXT,
    "status" "SessionStatus" NOT NULL DEFAULT 'SCHEDULED',
    "scheduledAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TherapySession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Progress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "therapySessionId" TEXT,
    "completionPct" INTEGER,
    "engagementScore" INTEGER,
    "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QRSession" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "QRStatus" NOT NULL DEFAULT 'PENDING',
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QRSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TherapistAssignment_userId_idx" ON "TherapistAssignment"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "TherapistAssignment_therapistId_userId_key" ON "TherapistAssignment"("therapistId", "userId");

-- CreateIndex
CREATE INDEX "ParentLink_childUserId_idx" ON "ParentLink"("childUserId");

-- CreateIndex
CREATE UNIQUE INDEX "ParentLink_parentId_childUserId_key" ON "ParentLink"("parentId", "childUserId");

-- CreateIndex
CREATE INDEX "Song_uploadedBy_idx" ON "Song"("uploadedBy");

-- CreateIndex
CREATE INDEX "TherapySession_therapistId_idx" ON "TherapySession"("therapistId");

-- CreateIndex
CREATE INDEX "TherapySession_userId_idx" ON "TherapySession"("userId");

-- CreateIndex
CREATE INDEX "Progress_userId_idx" ON "Progress"("userId");

-- CreateIndex
CREATE INDEX "Progress_therapySessionId_idx" ON "Progress"("therapySessionId");

-- CreateIndex
CREATE UNIQUE INDEX "QRSession_token_key" ON "QRSession"("token");

-- CreateIndex
CREATE INDEX "QRSession_userId_idx" ON "QRSession"("userId");

-- AddForeignKey
ALTER TABLE "TherapistAssignment" ADD CONSTRAINT "TherapistAssignment_therapistId_fkey" FOREIGN KEY ("therapistId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TherapistAssignment" ADD CONSTRAINT "TherapistAssignment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParentLink" ADD CONSTRAINT "ParentLink_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParentLink" ADD CONSTRAINT "ParentLink_childUserId_fkey" FOREIGN KEY ("childUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_uploadedBy_fkey" FOREIGN KEY ("uploadedBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TherapySession" ADD CONSTRAINT "TherapySession_therapistId_fkey" FOREIGN KEY ("therapistId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TherapySession" ADD CONSTRAINT "TherapySession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TherapySession" ADD CONSTRAINT "TherapySession_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Progress" ADD CONSTRAINT "Progress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Progress" ADD CONSTRAINT "Progress_therapySessionId_fkey" FOREIGN KEY ("therapySessionId") REFERENCES "TherapySession"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QRSession" ADD CONSTRAINT "QRSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
