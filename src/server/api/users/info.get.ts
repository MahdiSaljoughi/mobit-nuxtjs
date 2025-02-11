import UserRepository from "../../../repository/UserRepository";
import { defineEventHandler } from "h3";
import type { H3Event } from "h3";
import { verifyToken } from "../../utils/token";

export default defineEventHandler(async (event: H3Event) => {
  const token = event.headers.get("authorization");

  if (!token) {
    return { status_code: 401, message: "توکنی یافت نشد" };
  }

  const decoded: any = verifyToken(token);

  try {
    const user = await UserRepository.getById(Number(decoded.id));

    if (!user) {
      return {
        status_code: 404,
        message: "کاربر مورد نظر یافت نشد",
      };
    }

    return {
      status_code: 200,
      user,
    };
  } catch (error: unknown | Error) {
    return {
      status_code: 500,
      message: error instanceof Error ? error.message : "خطای ناشناخته",
    };
  }
});
