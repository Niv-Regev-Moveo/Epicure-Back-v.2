import jwt from "jsonwebtoken";
import { IUserModel } from "../models/user.model";

const secretKey = process.env.JWT_SECRET || "YOUR-SECRET-KEY";

export const verifyToken = (token: string): string | jwt.JwtPayload => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    console.error("Invalid token", error);
    throw new Error("Invalid or expired token");
  }
};
