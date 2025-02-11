import { defineEventHandler } from "h3";
import CategoryRepository from "../../../repository/CategoryRepository";

export default defineEventHandler(async () => {
  const category = await CategoryRepository.getAll();

  return {
    status_code: 200,
    category,
  };
});
