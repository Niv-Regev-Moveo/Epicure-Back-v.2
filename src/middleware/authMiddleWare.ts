import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/tokenUtils";
import { IUserModel } from "../models/user.model";

declare module "express-serve-static-core" {
  interface Request {
    user?: IUserModel;
  }
}
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log(token);
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded as IUserModel;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
