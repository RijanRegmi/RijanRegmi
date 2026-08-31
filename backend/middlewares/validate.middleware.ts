import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { ValidationError } from '../errors';

type ValidationSource = 'body' | 'query' | 'params';

export const validateRequest = (schema: ZodSchema, source: ValidationSource = 'body') => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      const dataToValidate = req[source];
      const parsed = schema.parse(dataToValidate);
      req[source] = parsed;
      req.validatedData = parsed;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));
        next(new ValidationError('Request validation failed', formattedErrors));
      } else {
        next(error);
      }
    }
  };
};
