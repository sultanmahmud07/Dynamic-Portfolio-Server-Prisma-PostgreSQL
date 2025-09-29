import { prisma } from "../../config/db";
import httpStatus from "http-status-codes";
import bcrypt from "bcrypt";
import { createUserTokens } from "../../utils/userTokens";
import { setAuthCookie } from "../../utils/setCookie";
import { sendResponse } from "../../utils/sendResponse";
import { Response } from "express";
import AppError from "../../errorHelpers/AppError";

const loginWithEmailAndPassword = async (
 { email, password, res }: { email: string; password: string ; res: Response },
) => {
  if (!email || !password) {
    throw new AppError(httpStatus.BAD_REQUEST, "Please provide email and password");
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid credentials");
  }

  // 🎟️ Generate tokens
  const userTokens = createUserTokens(user);

  // 🍪 Set cookies
  setAuthCookie(res, userTokens);

  // 🚀 Send response
  const { password: _pass, ...rest } = user;
return {
    accessToken: userTokens.accessToken,
    refreshToken: userTokens.refreshToken,
    user: rest, 
}
};

export const AuthService = {
  loginWithEmailAndPassword,
};
