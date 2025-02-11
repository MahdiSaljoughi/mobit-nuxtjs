import type { Prisma } from "@prisma/client";
import prisma from "../../prisma/prisma";
import type { TProduct } from "../types";

export interface IProductRepository {
  getAll(): Promise<TProduct[]>;
  getById(id: number): Promise<TProduct | null>;
  getBySlug(slug: string): Promise<TProduct | null>;
  create(data: Prisma.ProductCreateInput): Promise<TProduct>;
  updateBySlug(
    slug: string,
    data: Prisma.ProductUpdateInput
  ): Promise<TProduct>;
  updateById(id: number, data: Prisma.ProductUpdateInput): Promise<TProduct>;
  remove(id: number): Promise<TProduct>;
}

const ProductRepository: IProductRepository = {
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

  async create(data: Prisma.ProductCreateInput) {
    return await prisma.product.create({
      data,
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
