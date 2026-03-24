-- CreateEnum
CREATE TYPE "Status" AS ENUM ('SUBSCRIBED', 'UNSUBSCRIBED', 'INVITED', 'JOINED', 'BOUNCED');

-- CreateTable
CREATE TABLE "WaitlistEntry" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" VARCHAR(100),
    "userAgent" TEXT,
    "status" "Status" NOT NULL DEFAULT 'SUBSCRIBED',
    "signupSource" TEXT DEFAULT 'organic',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WaitlistEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BroadcastLog" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "recipientCount" INTEGER NOT NULL,
    "senderId" TEXT NOT NULL,

    CONSTRAINT "BroadcastLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WaitlistEntry_email_key" ON "WaitlistEntry"("email");

-- CreateIndex
CREATE INDEX "WaitlistEntry_email_idx" ON "WaitlistEntry"("email");

-- CreateIndex
CREATE INDEX "WaitlistEntry_status_idx" ON "WaitlistEntry"("status");
