import { defineEventHandler, readBody } from "h3";
import type { H3Event } from "h3";
import ProductRepository from "../../../repository/ProductRepository";
import gurd from "../../utils/gurd";
import { verifyToken } from "../../utils/token";

export default defineEventHandler(async (event: H3Event) => {
  const gurds = await gurd(event);

  if (gurds.status_code !== 200 || gurds.is_admin !== true) {
    return {
      status_code: 401,
      message: gurds.message,
    };
  }

  const token = event.headers.get("authorization");
  // @ts-expect-error
  const { id } = verifyToken(token);

  const body = await readBody(event);

  const product = await ProductRepository.create(body, id);

  return {
    status_code: 201,
    product,
    id,
  };
});
