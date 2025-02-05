import jwt from "jsonwebtoken";

export const encodeJWT = async (payload: UserType) => {
  const { email, firstname } = payload;

  const obj = { email, firstname };

  return jwt.sign(obj, process.env.APP_SECRET as string, {
    expiresIn: "24h",
  });
};
