import type { Prisma } from "@prisma/client";
import prisma from "../../prisma/prisma";
import type { TProduct } from "../types";

export interface IProductRepository {
  getAll(): Promise<TProduct[]>;
  getById(id: number): Promise<TProduct | null>;
  getBySlug(slug: string): Promise<TProduct | null>;
  create(data: Prisma.ProductCreateInput): Promise<TProduct>;
  updateById(id: number, data: Prisma.ProductUpdateInput): Promise<TProduct>;
  deleteById(id: number): Promise<TProduct>;
}

const ProductRepository: IProductRepository = {
  async getAll() {
    return await prisma.product.findMany({
      include: {
        images: true,
        variants: {
          orderBy: {
            id: "asc",
          },
        },
      },
    });
  },

  async getById(id: number) {
    return await prisma.product.findUnique({
      where: { id },
      include: {
        images: true,
        variants: {
          orderBy: {
            id: "asc",
          },
        },
      },
    });
  },

  async getBySlug(slug: string) {
    return await prisma.product.findUnique({
      where: { slug },
      include: {
        images: true,
        variants: {
          orderBy: {
            id: "asc",
          },
        },
      },
    });
  },

  async create(data: Prisma.ProductCreateInput) {
    return await prisma.product.create({
      data,
      include: {
        images: true,
        variants: true,
      },
    });
  },

  async updateById(id: number, data: Prisma.ProductUpdateInput) {
    return await prisma.product.update({
      where: { id },
      data,
      include: {
        images: true,
        variants: true,
      },
    });
  },

  async deleteById(id: number) {
    return await prisma.product.delete({
      where: { id },
      include: {
        images: true,
        variants: true,
      },
    });
  },
};

export default ProductRepository;
