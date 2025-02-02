import userDb from "../../../db/userDb";
import { getHeaders, defineEventHandler } from "h3";
import type { H3Event } from "h3";
import useAccessToken from "../../../features/auth/composables/useAccessToken";

export default defineEventHandler(async (event: H3Event) => {
  const { data: token } = useAccessToken(
    getHeaders(event)?.authorization || ""
  );

  if (!token) {
    return { status_code: 401, message: "توکنی یافت نشد" };
  }

  try {
    const user = await userDb.getById(Number(token.id));

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
