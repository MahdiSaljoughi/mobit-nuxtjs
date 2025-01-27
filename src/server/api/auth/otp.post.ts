import prisma from "../../../../prisma/prisma";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body || !body.phone) {
    return {
      status: 400,
      message: "شماره موبایل ارسال نشده است",
    };
  }

  const { phone } = body;

  const otp = Math.floor(1000 + Math.random() * 9000);

  const createdOtp = await prisma.otp.create({
    data: {
      code: String(otp),
      phone,
      expiresAt: new Date(Date.now() + 2 * 60 * 1000),
    },
  });

  return {
    message: "کد تایید با موفقیت ارسال شد",
    otp,
    expires_at: createdOtp.expiresAt,
  };
});
