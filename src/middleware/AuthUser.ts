import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const authUser = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(400).json({
        error: true,
        message: "Please Login First",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_TOKEN as string) as {
      id: string;
    };
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: true,
      message: "Something went wrong. Please try again later.",
    });
  }
};

export default authUser;
