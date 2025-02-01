import prisma from "../../../../prisma/prisma";
import gurd from "../../gurd";

export default defineEventHandler(async (event) => {
  const gurds = await gurd(event);

  if (gurds.status_code !== 200 || gurds.is_admin !== true) {
    return {
      status_code: 401,
      message: gurds.message,
    };
  }

  const id = event.context.params?.id;

  if (!id) {
    return {
      status_code: 400,
      message: "شناسه کاربر الزامی است",
    };
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
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
