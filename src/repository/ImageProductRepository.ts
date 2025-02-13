import type { Prisma } from "@prisma/client";
import prisma from "../../prisma/prisma";

const ImageProductRepository = {
  async create(data: Prisma.ProductImageCreateInput) {
    return await prisma.productImage.create({
      data,
    });
  },

  async remove(id: number) {
    return await prisma.productImage.delete({
      where: { id },
    });
  },
};

export default ImageProductRepository;
