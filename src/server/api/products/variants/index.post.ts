import { defineEventHandler, readBody } from "h3";
import type { H3Event } from "h3";
import gurd from "../../../utils/gurd";
import VariantProductRepository from "../../../../repository/VariantProductRepository";

export default defineEventHandler(async (event: H3Event) => {
  try {
    const gurds = await gurd(event);
    if (gurds.status_code !== 200 || gurds.is_admin !== true) {
      return { status_code: 401, message: "Unauthorized" };
    }

    const body = await readBody(event);

    const data = await VariantProductRepository.create(body);

    return {
      status_code: 201,
      message: "Product variant created  successfully",
      data: {
        data,
      },
    };
  } catch (error) {
    console.error("Upload Error:", error);
    return {
      // @ts-expect-error
      status_code: error.status_code || 500,
      // @ts-expect-error
      message: error.message || "Internal server error",
    };
  }
});
