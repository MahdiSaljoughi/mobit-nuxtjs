import UserRepository from "../../../repository/UserRepository";
import gurd from "../../utils/gurd";
import type { H3Event } from "h3";
import { defineEventHandler } from "h3";

export default defineEventHandler(async (event: H3Event) => {
  const gurds = await gurd(event);

  if (gurds.status_code !== 200 || gurds.is_admin !== true) {
    return {
      status_code: 401,
      message: gurds.message,
    };
  }

  const users = await UserRepository.getAll();

  return {
    status_code: 200,
    users,
    gurds,
  };
});
