import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";
import AppError from "../errorHelpers/AppError";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
import { TErrorSources } from "../interfaces/error.types";

// 🎯 Global Error Handler
export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (envVars.NODE_ENV === "development") {
    console.error("🔥 Global Error Handler:", err);
  }

  let errorSources: TErrorSources[] = [];
  let statusCode = 500;
  let message = "Something Went Wrong!!";

  // ✅ Prisma Duplicate Constraint Error
  if (
    err instanceof Prisma.PrismaClientKnownRequestError &&
    err.code === "P2002"
  ) {
    statusCode = 400;
    message = `Duplicate value for field(s): ${(err.meta?.target as string[])?.join(", ")}`;
  }

  // ✅ Prisma Record Not Found
  else if (
    err instanceof Prisma.PrismaClientKnownRequestError &&
    err.code === "P2025"
  ) {
    statusCode = 404;
    message = "Record not found";
  }

  // ✅ Prisma Validation Error
  else if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = 400;
    message = "Invalid data provided to Prisma";
  }

// ✅ Zod Validation Error
else if (err instanceof ZodError) {
  statusCode = 400;
  message = "Validation failed";
  errorSources = err.issues.map((issue) => ({
    path: issue.path.join("."),  // array of keys => string
    message: issue.message,
  }));
}

  // ✅ Custom AppError
  else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  // ✅ Native JS Error
  else if (err instanceof Error) {
    statusCode = 500;
    message = err.message;
  }

  // 🚀 Send Final Error Response
  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    err: envVars.NODE_ENV === "development" ? err : null,
    stack: envVars.NODE_ENV === "development" ? err.stack : null,
  });
};
