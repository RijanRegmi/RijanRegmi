import { AppError } from './app.error';
import { ErrorCode } from './error-codes';

export class ValidationError extends AppError {
  constructor(message: string = 'Validation Failed', errors?: any[]) {
    super(message, 422, ErrorCode.VALIDATION_ERROR, true, errors);
  }
}
