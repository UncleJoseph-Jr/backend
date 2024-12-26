/*
  Warnings:

  - You are about to drop the column `longtitude` on the `Merchant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Merchant" DROP COLUMN "longtitude",
ADD COLUMN     "longitude" DOUBLE PRECISION;
