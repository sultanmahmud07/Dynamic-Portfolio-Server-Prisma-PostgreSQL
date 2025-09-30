import { prisma } from "../../config/db";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";
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

  const isMatch = await bcryptjs.compare(password, user.password);
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
const credentialsLogin = async ({ email, password }: { email: string; password: string ; }) => {
    
    const isUserExist = await prisma.user.findUnique({
    where: { email },
  });

    if (!isUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "Email does not exist")
    }

    const isPasswordMatched = await bcrypt.compare(password as string, isUserExist.password as string)

    if (!isPasswordMatched) {
        throw new AppError(httpStatus.BAD_REQUEST, "Incorrect Password")
    }
    // const jwtPayload = {
    //     userId: isUserExist._id,
    //     email: isUserExist.email,
    //     role: isUserExist.role
    // }
    // const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_ACCESS_EXPIRES)

    // const refreshToken = generateToken(jwtPayload, envVars.JWT_REFRESH_SECRET, envVars.JWT_REFRESH_EXPIRES)

    const userTokens = createUserTokens(isUserExist)
    const { password: pass, ...rest } = isUserExist.toObject()

    return {
        accessToken: userTokens.accessToken,
        refreshToken: userTokens.refreshToken,
        user: rest
    }

}
export const AuthService = {
  loginWithEmailAndPassword,
  credentialsLogin
};
