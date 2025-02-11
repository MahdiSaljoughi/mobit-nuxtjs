import prisma from "../../prisma/prisma";
import type { TCategory } from "../types";

export interface ICategoryRepository {
  getAll(): Promise<TCategory[]>;
}

const CategoryRepository: ICategoryRepository = {
  async getAll() {
    return await prisma.category.findMany();
  },
};

export default CategoryRepository;
