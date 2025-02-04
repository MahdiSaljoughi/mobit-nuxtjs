import type { TUser } from "~/types";
import prisma from "~~/prisma/prisma";

export interface IUserRepository {
  getAll(): Promise<TUser[]>;
  getById(id: number): Promise<TUser | null>;
  create(data: Omit<TUser, "id">): Promise<TUser>;
  updateById(id: number, data: Partial<TUser>): Promise<TUser>;
  deleteById(id: number): Promise<TUser>;
}

const UserRepository: IUserRepository = {
  async getAll() {
    return await prisma.user.findMany();
  },

  async getById(id: number) {
    return await prisma.user.findUnique({ where: { id } });
  },

  async create(data: TUser) {
    return await prisma.user.create({ data });
  },

  async updateById(id: number, data: Partial<TUser>) {
    return await prisma.user.update({ where: { id }, data });
  },

  async deleteById(id: number) {
    return await prisma.user.delete({ where: { id } });
  },
};

export default UserRepository;
