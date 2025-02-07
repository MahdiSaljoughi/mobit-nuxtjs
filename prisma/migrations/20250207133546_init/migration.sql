-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "is_fast_delivery" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_offer" BOOLEAN NOT NULL DEFAULT false;
