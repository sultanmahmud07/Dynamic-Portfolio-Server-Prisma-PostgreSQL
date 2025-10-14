import { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { catchAsync } from "../../utils/catchAsync";
import httpStatus from "http-status-codes";
import { ProjectService } from "./post.service";

const createProject = catchAsync(async (req: Request, res: Response) => {
    const parsedData = req.body.data ? JSON.parse(req.body.data) : req.body;
    const payload = {
        ...parsedData,
        images: (req.files as Express.Multer.File[])?.map(file => file.path)
    }
    const project = await ProjectService.createProject(payload);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Project created successfully",
        data: project,
    });
});


const getAllProjects = catchAsync(async (req: Request, res: Response) => {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = (req.query.search as string) || "";
    const isFeatured = req.query.isFeatured ? req.query.isFeatured === "true" : undefined
    const tags = req.query.tags ? (req.query.tags as string).split(",") : []

    const result = await ProjectService.getAllProjects({ page, limit, search, isFeatured, tags });

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "All projects retrieved successfully",
        data: result,
    })
});

const getProjectById = catchAsync(async (req: Request, res: Response) => {

    const project = await ProjectService.getProjectById(req.params.slug);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Retrieve specific project Successfully",
        data: project,
    })
});

const updateProject = catchAsync(async (req: Request, res: Response,) => {
    const parsedData = req.body.data ? JSON.parse(req.body.data) : req.body;
    const projectId = req.params.id
      const payload = {
        ...parsedData,
        images: (req.files as Express.Multer.File[])?.map(file => file.path)
    }

    const project = await ProjectService.updateProject(Number(projectId), payload);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Project Update Successfully",
        data: project,
    })
});

const deleteProject = catchAsync(async (req: Request, res: Response,) => {
    await ProjectService.deleteProject(Number(req.params.id));
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Project delete Successfully",
        data: null,
    })
});


const getProjectStat = catchAsync(async (req: Request, res: Response,) => {

    const result = await ProjectService.getProjectStat();
    res.json(result);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Get static data Successfully",
        data: result,
    })
});

export const ProjectController = {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
    getProjectStat
}