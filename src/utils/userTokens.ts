import { envVars } from "../config/env";
import { generateToken } from "./jwt";
import { Prisma } from "@prisma/client";

export const createUserTokens = (user:  Prisma.UserCreateInput) => {
    const jwtPayload = {
        // userId: user.id,
        email: user.email,
        role: user.role
    }
    const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_ACCESS_EXPIRES)

    const refreshToken = generateToken(jwtPayload, envVars.JWT_REFRESH_SECRET, envVars.JWT_REFRESH_EXPIRES)


    return {
        accessToken,
        refreshToken
    }
}

// export const createNewAccessTokenWithRefreshToken = async (refreshToken: string) => {

//     const verifiedRefreshToken = verifyToken(refreshToken, envVars.JWT_REFRESH_SECRET) as JwtPayload


//     const isUserExist = await User.findOne({ email: verifiedRefreshToken.email })

//     if (!isUserExist) {
//         throw new AppError(httpStatus.BAD_REQUEST, "User does not exist")
//     }
//     if (isUserExist.isActive === IsActive.BLOCKED || isUserExist.isActive === IsActive.INACTIVE) {
//         throw new AppError(httpStatus.BAD_REQUEST, `User is ${isUserExist.isActive}`)
//     }
//     if (isUserExist.isDeleted) {
//         throw new AppError(httpStatus.BAD_REQUEST, "User is deleted")
//     }

//     const jwtPayload = {
//         userId: isUserExist._id,
//         email: isUserExist.email,
//         role: isUserExist.role
//     }
//     const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_ACCESS_EXPIRES)

//     return accessToken
// }