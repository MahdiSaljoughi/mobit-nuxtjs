import type { H3Event } from "h3";
import userDb from "../../repository/UserRepository";
import { verifyToken } from "./token";

export default async function gurd(event: H3Event) {
  const token = event.headers.get("authorization");

  if (!token) {
    return { status_code: 401, message: "توکنی یافت نشد" };
  }

  const decoded: any = verifyToken(token);

  const user = await userDb.getById(Number(decoded.id));

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
