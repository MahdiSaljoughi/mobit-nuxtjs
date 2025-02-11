import jwt from "jsonwebtoken";

const secret = useRuntimeConfig().authSecret;

export const createToken = (peyload: object) => {
  const token = jwt.sign(peyload, secret, {
    expiresIn: "1d",
  });

  return token;
};

export const verifyToken = (token: string) => {
  const removeBearer = token.split(" ")[1];

  try {
    const decoded = jwt.verify(removeBearer, secret);
    return decoded;
  } catch (error) {
    return { error, status_code: 401, message: "توکن نامعتبر است" };
  }
};
