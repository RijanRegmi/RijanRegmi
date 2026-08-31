import { AppError } from './app.error';
import { ErrorCode } from './error-codes';

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource Not Found') {
    super(message, 404, ErrorCode.NOT_FOUND, true);
  }
}
