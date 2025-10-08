import { prisma } from "../../config/db";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";
import { createUserTokens } from "../../utils/userTokens";
import { setAuthCookie } from "../../utils/setCookie";
import { Request, Response } from "express";
import AppError from "../../errorHelpers/AppError";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";

const credentialsLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const isUserExist = await prisma.user.findUnique({
    where: { email },
  });

  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "Email does not exist")
  }

  const isPasswordMatched = await bcryptjs.compare(password as string, isUserExist.password as string)

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.BAD_REQUEST, "Incorrect Password")
  }

  const userTokens = createUserTokens(isUserExist)
  const { password: pass, ...rest } = isUserExist
  setAuthCookie(res, userTokens)
  return {
    accessToken: userTokens.accessToken,
    refreshToken: userTokens.refreshToken,
    user: rest
  }

}
const changePassword = async (oldPassword: string, newPassword: string, decodedToken: JwtPayload) => {

    const user = await prisma.user.findUnique({
    where: { email: decodedToken.email },
  });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
    const isOldPasswordMatch = await bcryptjs.compare(oldPassword, user.password)
    if (!isOldPasswordMatch) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Old Password does not match");
    }


  const hashedPassword = await bcryptjs.hash(
    newPassword,
    Number(envVars.BCRYPT_SALT_ROUND)
  );

  await prisma.user.update({
    where: { email: decodedToken.email },
    data: { password: hashedPassword },
  });


}
export const AuthService = {
  credentialsLogin,
  changePassword
};
