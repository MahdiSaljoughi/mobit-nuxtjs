import { defineEventHandler } from "h3";
import ProductRepository from "../../../repository/ProductRepository";

export default defineEventHandler(async () => {
  const products = await ProductRepository.getAll();

  return {
    status_code: 200,
    products,
  };
});
