import { getToken } from "#auth";
import type { H3Event } from "h3";
import userDb from "../../repository/UserRepository";

export default async function gurd(event: H3Event) {
  const token = await getToken({ event });

  if (!token) {
    return { status_code: 401, message: "توکنی یافت نشد" };
  }

  const user = await userDb.getById(Number(token.id));

  if (!user) {
    return { status_code: 401, message: "کاربر یافت نشد" };
  }

  if (user.role !== "ADMIN") {
    return {
      status_code: 401,
      message: "شما اجازه دسترسی به این صفحه را ندارید",
    };
  }

  return {
    status_code: 200,
    user_role: user.role,
    is_admin: true,
  };
}
