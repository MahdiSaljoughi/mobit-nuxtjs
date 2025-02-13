import type { Prisma } from "@prisma/client";
import prisma from "../../prisma/prisma";

const VariantProductRepository = {
  async create(data: Prisma.ProductVariantCreateInput) {
    return await prisma.productVariant.create({
      data,
    });
  },

  async remove(id: number) {
    return await prisma.productVariant.delete({
      where: { id },
    });
  },
};

export default VariantProductRepository;
