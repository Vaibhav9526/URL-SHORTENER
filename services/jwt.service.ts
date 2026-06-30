import jwt from "jsonwebtoken";

export const jwtBind = (payload: { id: string }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET!);
  return token;
};
