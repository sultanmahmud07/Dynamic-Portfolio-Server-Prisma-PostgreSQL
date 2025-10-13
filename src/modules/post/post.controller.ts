import { Request, Response } from "express";
import { PostService } from "./post.service";
import { sendResponse } from "../../utils/sendResponse";
import { catchAsync } from "../../utils/catchAsync";
import httpStatus from "http-status-codes";

const createPost = catchAsync(async (req: Request, res: Response) => {
    const parsedData = req.body.data ? JSON.parse(req.body.data) : req.body;

    const payload = {
        ...parsedData,
        thumbnail: req.file?.path,
    };

    const blog = await PostService.createPost(payload);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Blog created successfully",
        data: blog,
    });
});


const getAllPosts = catchAsync(async (req: Request, res: Response) => {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = (req.query.search as string) || "";
    const isFeatured = req.query.isFeatured ? req.query.isFeatured === "true" : undefined
    const tags = req.query.tags ? (req.query.tags as string).split(",") : []

    const result = await PostService.getAllPosts({ page, limit, search, isFeatured, tags });

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "All post get Successfully",
        data: result,
    })
});

const getPostById = catchAsync(async (req: Request, res: Response) => {

    const post = await PostService.getPostById(req.params.slug);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Retrieve specific post Successfully",
        data: post,
    })
});

const updatePost = catchAsync(async (req: Request, res: Response,) => {
    const parsedData = req.body.data ? JSON.parse(req.body.data) : req.body;
    const postId = req.params.id
    const payload = {
        ...parsedData,
        thumbnail: req.file?.path,
    };

    const post = await PostService.updatePost(Number(postId), payload);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Post Update Successfully",
        data: post,
    })
});

const deletePost = catchAsync(async (req: Request, res: Response,) => {
    await PostService.deletePost(Number(req.params.id));
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Post delete Successfully",
        data: null,
    })
});


const getBlogStat = catchAsync(async (req: Request, res: Response,) => {

    const result = await PostService.getBlogStat();
    res.json(result);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Get static data Successfully",
        data: result,
    })
});

export const PostController = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    getBlogStat
}