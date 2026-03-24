import type { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {

  const statusCode = err.statusCode || 500
  const message = err.message || "Internal Server Error"
  const code = err.code || "INTERNAL_ERROR"

  console.error(err);
  res.status(statusCode).json({
    success: false,
    error: {
      message,
      code,
      // Only show stack trace in development mode
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    }
  })
};
