import { Response } from 'express';
import { IApiResponse } from '../types';

export class ApiResponse {
  static success<T>(
    res: Response,
    data: T,
    message: string = 'Success',
    statusCode: number = 200,
    meta?: IApiResponse['meta']
  ): Response {
    const payload: IApiResponse<T> = {
      success: true,
      statusCode,
      message,
      data,
      meta,
    };
    return res.status(statusCode).json(payload);
  }

  static created<T>(
    res: Response,
    data: T,
    message: string = 'Resource created successfully'
  ): Response {
    return ApiResponse.success(res, data, message, 201);
  }

  static error(
    res: Response,
    message: string = 'An error occurred',
    statusCode: number = 500,
    errorCode?: string,
    errors?: any[]
  ): Response {
    const payload: IApiResponse = {
      success: false,
      statusCode,
      message,
      error: errorCode,
      errors,
    };
    return res.status(statusCode).json(payload);
  }
}
