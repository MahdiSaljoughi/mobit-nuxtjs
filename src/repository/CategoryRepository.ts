import prisma from "../../prisma/prisma";

const CategoryRepository = {
  async getAll() {
    return await prisma.category.findMany();
  },
};

export default CategoryRepository;
