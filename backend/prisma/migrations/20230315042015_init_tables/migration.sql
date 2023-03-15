-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PROCESSED', 'DONE', 'CANCELED');

-- CreateEnum
CREATE TYPE "QuotaStatus" AS ENUM ('FREE', 'RESERVED', 'PAYED');

-- CreateEnum
CREATE TYPE "ContactType" AS ENUM ('EMAIL', 'PHONE', 'TEL_PHONE', 'OTHER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "type" "ContactType" NOT NULL,
    "value" TEXT NOT NULL,
    "confirmed_token" TEXT NOT NULL,
    "confirmed_token_expierd_at" TIMESTAMP(3) NOT NULL,
    "confirmed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("user_id","type")
);

-- CreateTable
CREATE TABLE "Raffle" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "start_at" TIMESTAMP(3),
    "finish_at" TIMESTAMP(3),
    "saller_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Raffle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reward" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "raffle_id" TEXT NOT NULL,

    CONSTRAINT "Reward_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Yield" (
    "estimated_roi_percent" DOUBLE PRECISION,
    "quota_price" DOUBLE PRECISION,
    "raffle_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Quota" (
    "id" BIGSERIAL NOT NULL,
    "status" "QuotaStatus" NOT NULL DEFAULT 'FREE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reserved_at" TIMESTAMP(3),
    "payed_at" TIMESTAMP(3),
    "raffle_id" TEXT NOT NULL,
    "customer_id" TEXT,
    "payment_id" TEXT,

    CONSTRAINT "Quota_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "quota_id" BIGINT NOT NULL,
    "last_check" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plan" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "fee" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Contact_value_key" ON "Contact"("value");

-- CreateIndex
CREATE UNIQUE INDEX "Raffle_slug_key" ON "Raffle"("slug");

-- CreateIndex
CREATE INDEX "Raffle_slug_idx" ON "Raffle"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Reward_raffle_id_key" ON "Reward"("raffle_id");

-- CreateIndex
CREATE UNIQUE INDEX "Yield_raffle_id_key" ON "Yield"("raffle_id");

-- CreateIndex
CREATE UNIQUE INDEX "Quota_raffle_id_key" ON "Quota"("raffle_id");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_quota_id_key" ON "Payment"("quota_id");

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Raffle" ADD CONSTRAINT "Raffle_saller_id_fkey" FOREIGN KEY ("saller_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reward" ADD CONSTRAINT "Reward_raffle_id_fkey" FOREIGN KEY ("raffle_id") REFERENCES "Raffle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Yield" ADD CONSTRAINT "Yield_raffle_id_fkey" FOREIGN KEY ("raffle_id") REFERENCES "Raffle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quota" ADD CONSTRAINT "Quota_raffle_id_fkey" FOREIGN KEY ("raffle_id") REFERENCES "Raffle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quota" ADD CONSTRAINT "Quota_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_quota_id_fkey" FOREIGN KEY ("quota_id") REFERENCES "Quota"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
