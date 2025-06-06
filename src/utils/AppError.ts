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
  internalMessage?: string,
}

interface AppErrorSubClassesOptions {
  internalMessage?: string,
  meta?: Record<string, any>,
}

export class AppError extends Error {
  public readonly httpStatusCode: HTTP_STATUS;
  public readonly errorCode?: ErrorCode;
  public readonly isOperational: boolean;
  public readonly meta?: Record<string, any>;
  public readonly severity?: string;
  public readonly internalMessage?: string;

  constructor(errorOptions: AppErrorOptions) {
    const {
      message,
      httpStatusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR,
      errorCode = ErrorCode.UNKNOWN_ERROR,
      meta,
      isOperational = true,
      severity,
      internalMessage
    }: AppErrorOptions = errorOptions;
    super(message);
    this.httpStatusCode = httpStatusCode;
    this.isOperational = isOperational;
    this.meta = meta;
    this.severity = severity;
    this.errorCode = errorCode;
    this.internalMessage = internalMessage;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class UnauthorizedError extends AppError {
  constructor({
    internalMessage,
    meta
  }: AppErrorSubClassesOptions) {
    super({
      message: ERROR_MESSAGES[ErrorCode.UNAUTHORIZED],
      httpStatusCode: HTTP_STATUS.UNAUTHORIZED,
      errorCode: ErrorCode.UNAUTHORIZED,
      severity: LogLevel.WARN,
      internalMessage,
      meta,
    });
  }
}

export class InternalServerError extends AppError {
  constructor({
    internalMessage,
    meta
  }: AppErrorSubClassesOptions) {

    super({
      message: ERROR_MESSAGES[ErrorCode.INTERNAL_SERVER_ERROR],
      httpStatusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      errorCode: ErrorCode.INTERNAL_SERVER_ERROR,
      severity: LogLevel.ERROR,
      internalMessage,
      meta,
    });
  }
}

export class BadRequest extends AppError {
  constructor({
    internalMessage,
    meta
  }: AppErrorSubClassesOptions) {
    super({
      message: ERROR_MESSAGES[ErrorCode.BAD_REQUEST],
      httpStatusCode: HTTP_STATUS.BAD_REQUEST,
      errorCode: ErrorCode.BAD_REQUEST,
      severity: LogLevel.WARN,
      internalMessage,
      meta,
    });
  }
}

export class UserAlreadyExistsError extends AppError {
  constructor({
    internalMessage,
    meta
  }: AppErrorSubClassesOptions) {
    super({
      message: ERROR_MESSAGES[ErrorCode.USER_ALREADY_EXISTS],
      httpStatusCode: HTTP_STATUS.CONFLICT,
      errorCode: ErrorCode.USER_ALREADY_EXISTS,
      severity: LogLevel.WARN,
      internalMessage,
      meta,
    });
  }
}

export class InvalidCredentialsError extends AppError {
  constructor({
    internalMessage,
    meta
  }: AppErrorSubClassesOptions) {
    super({
      message: ERROR_MESSAGES[ErrorCode.INVALID_CREDENTIALS],
      httpStatusCode: HTTP_STATUS.UNAUTHORIZED,
      errorCode: ErrorCode.INVALID_CREDENTIALS,
      severity: LogLevel.WARN,
      internalMessage,
      meta,
    });
  }
}
