import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../utils/AppError';
import { LogLevel } from '../utils/logger';
import { ErrorCode } from '../constants/errorCodes';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return next(new UnauthorizedError({
    message: 'You must be logged in to access this route',
    severity: LogLevel.WARN,
    errorCode: ErrorCode.UNAUTHORIZED
  }));
};
