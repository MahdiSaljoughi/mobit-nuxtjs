/*
  Warnings:

  - You are about to drop the column `expiresAt` on the `Otp` table. All the data in the column will be lost.
  - You are about to drop the column `discount_percentage` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `ProductCategory` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `ProductImage` table. All the data in the column will be lost.
  - You are about to drop the column `access_token` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `attributes` on the `Variant` table. All the data in the column will be lost.
  - You are about to drop the column `discount_percentage` on the `Variant` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `Variant` table. All the data in the column will be lost.
  - You are about to drop the `VariantAttribute` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `expires_at` to the `Otp` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `ProductCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `ProductImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Variant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `Variant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Variant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProductCategory" DROP CONSTRAINT "ProductCategory_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductImage" DROP CONSTRAINT "ProductImage_productId_fkey";

-- DropForeignKey
ALTER TABLE "Variant" DROP CONSTRAINT "Variant_productId_fkey";

-- DropForeignKey
ALTER TABLE "VariantAttribute" DROP CONSTRAINT "VariantAttribute_variantId_fkey";

-- AlterTable
ALTER TABLE "Otp" DROP COLUMN "expiresAt",
ADD COLUMN     "expires_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "discount_percentage",
ADD COLUMN     "discount" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "ProductCategory" DROP COLUMN "productId",
ADD COLUMN     "product_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ProductImage" DROP COLUMN "productId",
ADD COLUMN     "product_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "access_token";

-- AlterTable
ALTER TABLE "Variant" DROP COLUMN "attributes",
DROP COLUMN "discount_percentage",
DROP COLUMN "productId",
ADD COLUMN     "discount" DOUBLE PRECISION,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "product_id" INTEGER NOT NULL,
ADD COLUMN     "value" TEXT NOT NULL,
ALTER COLUMN "quantity" DROP DEFAULT,
ALTER COLUMN "price_after_discount" DROP NOT NULL,
ALTER COLUMN "price_after_discount" DROP DEFAULT;

-- DropTable
DROP TABLE "VariantAttribute";

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "status_order" TEXT NOT NULL,
    "delivery_address" TEXT NOT NULL,
    "payment_method" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderProduct" (
    "id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "OrderProduct_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Order_id_key" ON "Order"("id");

-- CreateIndex
CREATE UNIQUE INDEX "OrderProduct_id_key" ON "OrderProduct"("id");

-- AddForeignKey
ALTER TABLE "Variant" ADD CONSTRAINT "Variant_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductCategory" ADD CONSTRAINT "ProductCategory_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "ProductCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductImage" ADD CONSTRAINT "ProductImage_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderProduct" ADD CONSTRAINT "OrderProduct_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderProduct" ADD CONSTRAINT "OrderProduct_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
