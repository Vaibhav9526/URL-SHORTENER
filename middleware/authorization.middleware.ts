import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import type IAuthUser from "../types/Auth.types.ts";

export const authorization = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const tokenHeader = req.headers["authorization"];

    if (!tokenHeader) return next();
    if (!tokenHeader.startsWith("Bearer")) return next();

    const token = tokenHeader.split(" ")[1];

    const checkToken = jwt.verify(token, process.env.JWT_SECRET!) as IAuthUser;

    req.user = checkToken;

    next();
  } catch (error) {
    res.status(400).json(error);
  }
};
