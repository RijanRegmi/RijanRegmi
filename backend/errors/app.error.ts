import { ErrorCode } from './error-codes';

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly errorCode: ErrorCode;
  public readonly isOperational: boolean;
  public readonly errors?: any[];

  constructor(
    message: string,
    statusCode: number = 500,
    errorCode: ErrorCode = ErrorCode.INTERNAL_SERVER_ERROR,
    isOperational: boolean = true,
    errors?: any[]
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.isOperational = isOperational;
    this.errors = errors;

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}
