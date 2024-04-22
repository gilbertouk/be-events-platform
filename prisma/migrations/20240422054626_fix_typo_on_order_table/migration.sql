/*
  Warnings:

  - You are about to drop the column `paumentStripeId` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "paumentStripeId",
ADD COLUMN     "paymentStripeId" TEXT;
