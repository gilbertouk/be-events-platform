/*
  Warnings:

  - You are about to drop the column `statusSripeId` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "statusSripeId",
ADD COLUMN     "statusStripeId" TEXT;
