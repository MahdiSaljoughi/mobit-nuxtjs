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

  const users = await prisma.user.findMany();
  return {
    status_code: 200,
    users,
    gurds,
  };
});
