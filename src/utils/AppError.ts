import { HTTP_STATUS } from './httpStatus';

interface AppErrorOptions {
  message?: string;
  httpStatusCode?: number;
  meta?: Record<string, any>;
  isOperational?: boolean;
}

export class AppError extends Error {
  public readonly httpStatusCode: number;
  public readonly isOperational: boolean;
  public readonly meta?: Record<string, any>;

  constructor(errorOptions: AppErrorOptions) {
    const { message, httpStatusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR, meta, isOperational = true } = errorOptions;
    super(message);
    this.httpStatusCode = httpStatusCode;
    this.isOperational = isOperational;
    this.meta = meta;
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
      httpStatusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    };
    super(errorOptions);
  }
}
