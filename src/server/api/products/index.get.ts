import { defineEventHandler } from "h3";
import productDb from "../../../db/productDb";

export default defineEventHandler(async () => {
  const products = await productDb.getAll();

  return {
    status_code: 200,
    products,
  };
});
