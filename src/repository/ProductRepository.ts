import type { Prisma } from "@prisma/client";
import prisma from "../../prisma/prisma";

const ProductRepository = {
  async getAll() {
    return await prisma.product.findMany({
      include: {
        author: { select: { user_name: true } },
        images: {
          orderBy: {
            id: "asc",
          },
        },
        variants: {
          orderBy: {
            id: "asc",
          },
        },
        category: true,
      },
      orderBy: {
        created_by: "asc",
      },
    });
  },

  async getById(id: number) {
    return await prisma.product.findUnique({
      where: { id },
      include: {
        author: { select: { user_name: true } },
        images: {
          orderBy: {
            id: "asc",
          },
        },
        variants: {
          orderBy: {
            id: "asc",
          },
        },
        category: true,
      },
    });
  },

  async getBySlug(slug: string) {
    return await prisma.product.findUnique({
      where: { slug },
      include: {
        author: { select: { user_name: true } },
        images: {
          orderBy: {
            id: "asc",
          },
        },
        variants: {
          orderBy: {
            id: "asc",
          },
        },
        category: true,
      },
    });
  },

  async create(data: any, created_by: number) {
    return await prisma.product.create({
      data: {
        created_by,
        ...data,
      },
      include: {
        author: { select: { user_name: true } },
        images: true,
        variants: true,
        category: true,
      },
    });
  },

  async updateBySlug(slug: string, data: Prisma.ProductUpdateInput) {
    return await prisma.product.update({
      where: { slug },
      data,
      include: {
        author: true,
        images: true,
        variants: true,
        category: true,
      },
    });
  },

  async updateById(id: number, data: Prisma.ProductUpdateInput) {
    return await prisma.product.update({
      where: { id },
      data,
      include: {
        author: true,
        images: true,
        variants: true,
        category: true,
      },
    });
  },

  async remove(id: number) {
    await prisma.productVariant.deleteMany({
      where: { product_id: id },
    });

    await prisma.productImage.deleteMany({
      where: { product_id: id },
    });

    return await prisma.product.delete({
      where: { id },
      include: {
        author: true,
        images: true,
        variants: true,
        category: true,
      },
    });
  },
};

export default ProductRepository;
