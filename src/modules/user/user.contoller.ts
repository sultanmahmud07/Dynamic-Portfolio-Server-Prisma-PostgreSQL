import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { UserService } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";

const createUser = async (req: Request, res: Response) => {
    try {
        const result = await UserService.createUser(req.body)
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: "All Admin Retrieved Successfully",
            data: result,
        })
    } catch (error) {
        res.status(500).send(error)
    }
}

const getAllFromDB = async (req: Request, res: Response) => {
    try {
        const result = await UserService.getAllFromDB()
        res.status(201).json(result);
    } catch (error) {
        res.status(500).send(error)
    }
}

const getUserById = async (req: Request, res: Response) => {
    try {
        const result = await UserService.getUserById(Number(req.params.id))
        res.status(201).json(result);
    } catch (error) {
        res.status(500).send(error)
    }
}

const updateUser = async (req: Request, res: Response) => {
    try {
        const result = await UserService.updateUser(Number(req.params.id), req.body)
        res.status(201).json(result);
    } catch (error) {
        res.status(500).send(error)
    }
}

const deleteUser = async (req: Request, res: Response) => {
    try {
        const result = await UserService.deleteUser(Number(req.params.id))
        res.status(201).json(result);
    } catch (error) {
        res.status(500).send(error)
    }
}

export const UserController = {
    createUser,
    getAllFromDB,
    getUserById,
    updateUser,
    deleteUser
}