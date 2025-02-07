import { defineEventHandler } from "h3";
import type { H3Event } from "h3";
import ProductRepository from "../../../repository/ProductRepository";

export default defineEventHandler(async (event: H3Event) => {
  const slug = event.context.params?.id;

  if (!slug) {
    return {
      status_code: 400,
      message: "شناسه محصول الزامی است",
    };
  }

  try {
    const product = await ProductRepository.getBySlug(String(slug));

    if (!product) {
      return {
        status_code: 404,
        message: "محصول مورد نظر یافت نشد",
      };
    }

    return {
      status_code: 200,
      product,
    };
  } catch (error: unknown) {
    return {
      status_code: 500,
      message: error instanceof Error ? error.message : "خطای ناشناخته",
    };
  }
});
