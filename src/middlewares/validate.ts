import { NextFunction, Request, RequestHandler, Response } from 'express';
import { ZodSchema } from 'zod';
import { BadRequest } from '../utils/AppError';
import { log, LogLevel } from '../utils/logger';

export const validate = (schema: ZodSchema<any>): RequestHandler => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse({ body: req.body });
    next();
  } catch (error: any) {
    log('Error on validating request for register or login', LogLevel.DEBUG, { error });
    next(new BadRequest({
      message: error.errors?.[0]?.message || 'Validation error',
      severity: LogLevel.WARN,
    }));
  }
};
