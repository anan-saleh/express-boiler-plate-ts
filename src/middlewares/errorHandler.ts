import { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/AppError';
import { HTTP_STATUS } from '../constants/httpStatus';
import { log, LogLevel } from '../utils/logger';
import { sanitizeObjectFromPassword } from '../utils/sanitizers';

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction, // important part of the error handler for express even if it's not used
) => {
  const statusCode = err.httpStatusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const message = err.message || 'Something went wrong';
  log(message, LogLevel.DEBUG, { err, req });
  const severity = err.severity as LogLevel;
  log(message, severity, {
    // message: err.message,
    internalMessage: err.internalMessage,
    errorCode: err.errorCode,
    body: sanitizeObjectFromPassword(req.body),
    stack: err.stack,
    path: req.originalUrl,
    method: req.method,
  });
  res.status(statusCode).json({
    status: 'error',
    message,
    errorCode: err.errorCode
  });
};
