import { AppError } from './app.error';
import { ErrorCode } from './error-codes';

export class BadRequestError extends AppError {
  constructor(message: string = 'Bad Request', errors?: any[]) {
    super(message, 400, ErrorCode.BAD_REQUEST, true, errors);
  }
}
