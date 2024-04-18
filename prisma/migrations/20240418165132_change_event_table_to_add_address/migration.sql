/*
  Warnings:

  - Added the required column `address` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postcode` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "postcode" TEXT NOT NULL;
