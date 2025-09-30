import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { UserService } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import { catchAsync } from "../../utils/catchAsync";


const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserService.createUser(req.body)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User created successfully",
        data: result,
    })
})


const getAllFromDB = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const result = await UserService.getAllFromDB()
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "All Users Retrieved Successfully",
        data: result.data,
    })

})

const getUserById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const result = await UserService.getUserById(Number(req.params.id))
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "All Single User Retrieved Successfully",
        data: result,
    })
})

const updateUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const result = await UserService.updateUser(Number(req.params.id), req.body)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Update User Info Successfully",
        data: result,
    })
})

const deleteUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserService.deleteUser(Number(req.params.id))
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User Delete Successfully",
        data: result,
    })
})

export const UserController = {
    createUser,
    getAllFromDB,
    getUserById,
    updateUser,
    deleteUser
}