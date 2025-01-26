import { object, string } from "yup";

export const formAuthSchema = object({
  phone: string()
    .matches(/^[0-9]{11}$/, "شماره موبایل باید 11 رقم باشد")
    .required("شماره موبایل الزامی است")
    .test("starts-with-09", "شماره موبایل معتبر نیست", (value) => {
      return value ? value.startsWith("09") : false;
    }),
});
