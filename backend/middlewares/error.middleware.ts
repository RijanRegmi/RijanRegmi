import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { AppError } from '../errors/app.error';
import { ErrorCode } from '../errors/error-codes';
import { ApiResponse } from '../utils/response';
import { logger } from '../utils/logger';

export const errorHandler: ErrorRequestHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  logger.error(`Error processing ${req.method} ${req.originalUrl}:`, err);

  if (err instanceof AppError) {
    return ApiResponse.error(
      res,
      err.message,
      err.statusCode,
      err.errorCode,
      err.errors
    );
  }

  // Handle Mongoose / MongoDB errors
  if (err.name === 'ValidationError') {
    return ApiResponse.error(
      res,
      'Database validation error',
      422,
      ErrorCode.VALIDATION_ERROR
    );
  }

  if (err.name === 'CastError') {
    return ApiResponse.error(
      res,
      'Invalid identifier provided',
      400,
      ErrorCode.BAD_REQUEST
    );
  }

  // Fallback for unhandled unexpected errors
  const isDev = process.env.NODE_ENV !== 'production';
  return ApiResponse.error(
    res,
    isDev ? err.message || 'Internal Server Error' : 'Internal Server Error',
    500,
    ErrorCode.INTERNAL_SERVER_ERROR
  );
};
