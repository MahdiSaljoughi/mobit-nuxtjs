import { getToken } from "#auth";
import prisma from "./../../prisma/prisma";

export default async function gurd(event: unknown) {
  const token: { id: string } = await getToken({ event });

  if (!token) {
    return { status_code: 401, message: "توکنی یافت نشد" };
  }

  const user = await prisma.user.findUnique({
    where: {
      id: Number(token.id),
    },
  });

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
