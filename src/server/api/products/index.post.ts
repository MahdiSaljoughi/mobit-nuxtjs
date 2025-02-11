import { defineEventHandler, readBody } from "h3";
import type { H3Event } from "h3";
import ProductRepository from "../../../repository/ProductRepository";
import gurd from "../../utils/gurd";

export default defineEventHandler(async (event: H3Event) => {
  const gurds = await gurd(event);

  if (gurds.status_code !== 200 || gurds.is_admin !== true) {
    return {
      status_code: 401,
      message: gurds.message,
    };
  }

  const body = await readBody(event);

  const product = await ProductRepository.create(body);

  return {
    status_code: 201,
    product,
  };
});
