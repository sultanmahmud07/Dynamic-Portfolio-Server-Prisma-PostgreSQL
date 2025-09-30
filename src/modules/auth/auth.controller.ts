import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../config/db";
import { AuthService } from "./auth.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";


const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  // 1️⃣ Check user existence
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid credentials");
  }

  // 2️⃣ Compare password
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid credentials");
  }

  // 3️⃣ Create JWT
  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  // 4️⃣ Set httpOnly cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 3600 * 1000, // 7 days
  });

  // 5️⃣ Send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User Logged In Successfully",
    data: { token, user: { id: user.id, email: user.email, role: user.role } },
  });
});

const logout = (req: Request, res: Response) => {
    res.clearCookie("token");
    res.json({ message: "Logged out" });
};


export const AuthController = {
    login,
    logout
};
