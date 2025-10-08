import { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";


const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

  const userTokens = await AuthService.credentialsLogin(req, res)

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "User Logged In Successfully",
            data: userTokens,
        })
});

const logout = (req: Request, res: Response) => {
    res.clearCookie("token");
    res.json({ message: "Logged out" });
};

const changePassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const newPassword = req.body.newPassword;
    const oldPassword = req.body.oldPassword;
    const decodedToken = req.user

   await AuthService.changePassword(oldPassword, newPassword, decodedToken);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Password Changed Successfully",
        data: decodedToken,
    })
})
export const AuthController = {
    login,
    logout,
    changePassword
};
