import { HTTP_STATUS } from '../constants/httpStatus';
import { ErrorCode } from '../constants/errorCodes';
import { LogLevel } from './logger';
import { ERROR_MESSAGES } from '../constants/errorMessages';

interface AppErrorOptions {
  message?: string;
  httpStatusCode?: HTTP_STATUS;
  errorCode?: ErrorCode;
  meta?: Record<string, any>;
  isOperational?: boolean;
  severity?: string,
}

export class AppError extends Error {
  public readonly httpStatusCode: HTTP_STATUS;
  public readonly errorCode?: ErrorCode;
  public readonly isOperational: boolean;
  public readonly meta?: Record<string, any>;
  public readonly severity?: string;

  constructor(errorOptions: AppErrorOptions) {
    const {
      message,
      httpStatusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR,
      errorCode = ErrorCode.UNKNOWN_ERROR,
      meta,
      isOperational = true,
      severity
    }: AppErrorOptions = errorOptions;
    super(message);
    this.httpStatusCode = httpStatusCode;
    this.isOperational = isOperational;
    this.meta = meta;
    this.severity = severity;
    this.errorCode = errorCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class UnauthorizedError extends AppError {
  constructor(errorOptions: AppErrorOptions) {
    const options = {
      ...errorOptions,
      httpStatusCode: HTTP_STATUS.UNAUTHORIZED,
    };
    super(options);
  }
}

export class InternalServerError extends AppError {
  constructor(errorOptions: AppErrorOptions) {
    const options = {
      ...errorOptions,
      severity: LogLevel.ERROR,
      httpStatusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      errorCode: ErrorCode.INTERNAL_SERVER_ERROR
    };
    super(options);
  }
}

export class BadRequest extends AppError {
  constructor(errorOptions: AppErrorOptions) {
    const options = {
      ...errorOptions,
      httpStatusCode: HTTP_STATUS.BAD_REQUEST,
    };
    super(options);
  }
}

export class UserAlreadyExistsError extends AppError {
  constructor(meta?: Record<string, any>) {
    super({
      message: ERROR_MESSAGES[ErrorCode.USER_ALREADY_EXISTS],
      httpStatusCode: HTTP_STATUS.CONFLICT,
      errorCode: ErrorCode.USER_ALREADY_EXISTS,
      severity: LogLevel.WARN,
      meta,
    });
  }
}
