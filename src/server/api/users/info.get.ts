import prisma from "../../../../prisma/prisma";
// import { getToken } from "#auth";
import useAccessToken from "../../../features/auth/composables/useAccessToken";

export default defineEventHandler(async (event) => {
  const { data: token } = useAccessToken(getHeaders(event).authorization);

  if (!token) {
    return { status_code: 401, message: "توکنی یافت نشد" };
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(token.id),
      },
    });

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
  } catch (error) {
    return {
      status_code: 500,
      message: error.message,
    };
  }
});
