import { defineEventHandler } from "h3";
import type { H3Event } from "h3";
import gurd from "../../../utils/gurd";
import ImageProductRepository from "../../../../repository/ImageProductRepository";

export default defineEventHandler(async (event: H3Event) => {
  const gurds = await gurd(event);

  if (gurds.status_code !== 200 || gurds.is_admin !== true) {
    return {
      status_code: 401,
      message: gurds.message,
    };
  }

  const id = event.context.params?.id;

  if (!id) {
    return {
      status_code: 400,
      message: "شناسه تصویر الزامی است",
    };
  }

  try {
    const productImage = await ImageProductRepository.remove(Number(id));

    if (!productImage) {
      return {
        status_code: 404,
        message: "تصویر مورد نظر یافت نشد",
      };
    }

    return {
      status_code: 200,
      productImage,
    };
  } catch (error: unknown) {
    return {
      status_code: 500,
      message: error instanceof Error ? error.message : "خطای ناشناخته",
    };
  }
});
