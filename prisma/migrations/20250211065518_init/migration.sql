/*
  Warnings:

  - You are about to drop the column `discount` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "discount",
DROP COLUMN "price",
ADD COLUMN     "is_show" BOOLEAN NOT NULL DEFAULT false;
