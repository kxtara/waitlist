/*
  Warnings:

  - Added the required column `content` to the `BroadcastLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BroadcastLog" ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "failureCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "successCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "WaitlistEntry" ADD COLUMN     "lastContactedAt" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "WaitlistEntry_signupSource_idx" ON "WaitlistEntry"("signupSource");
