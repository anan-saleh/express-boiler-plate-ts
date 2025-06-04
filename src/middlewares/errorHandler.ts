import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import { HTTP_STATUS } from '../utils/httpStatus';
import { log, LogLevel } from '../utils/logger';

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err instanceof AppError ? err.httpStatusCode : HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const message = err instanceof AppError ? err.message : 'Something went wrong';
  log(message, LogLevel.DEBUG, { err, req });
  log(message, LogLevel.ERROR, {
    message: err.message,
    stack: err.stack,
    path: req.originalUrl,
    method: req.method,
  });
  res.status(statusCode).json({
    status: 'error',
    message,
  });
};
