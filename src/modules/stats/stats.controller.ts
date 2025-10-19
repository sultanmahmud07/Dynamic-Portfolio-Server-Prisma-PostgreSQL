import { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { catchAsync } from "../../utils/catchAsync";
import httpStatus from "http-status-codes";
import { StatsService } from "./stats.service";

const getProjectStat = catchAsync(async (req: Request, res: Response) => {
  const result = await StatsService.getDashboardStats();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Dashboard overview fetched successfully",
    data: result,
  });
});

const getRecentActivities = catchAsync(async (req: Request, res: Response) => {
  const result = await StatsService.getRecentActivities();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Recent activities fetched successfully",
    data: result,
  });
});

export const StatsController = {
  getProjectStat,
  getRecentActivities,
};
