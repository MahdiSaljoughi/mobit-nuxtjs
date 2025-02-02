// @ts-expect-error
import jwt from "jsonwebtoken";

export default function useAccessToken(token: string) {
  const secret = useRuntimeConfig().authSecret;

  if (!token) {
    return { error: "توکن ارائه نشده است", data: null };
  }

  const tokenNotBearer = token.replace("Bearer ", "").trim();

  try {
    const decoded = jwt.verify(tokenNotBearer, secret);
    return { error: null, data: decoded };
  } catch (err: unknown | Error) {
    return { error: "توکن نامعتبر است", data: null };
  }
}
