import { HTTP_STATUS_CODE } from '../constants/httpStatusCode';
import { ERROR_CODE } from '../constants/errorCodes';
import { LogLevel } from './logger';
import { RESPONSE_STATUS } from '../constants/responseStatus';

interface AppErrorOptions {
  message?: string;
  httpStatusCode?: HTTP_STATUS_CODE;
  errorCode?: ERROR_CODE;
  meta?: Record<string, any>;
  isOperational?: boolean;
  severity?: string,
  internalMessage?: string,
  responseStatus?: RESPONSE_STATUS,
}

interface AppErrorSubClassesOptions {
  internalMessage?: string,
  meta?: Record<string, any>,
}

export class AppError extends Error {
  public readonly httpStatusCode: HTTP_STATUS_CODE;
  public readonly errorCode?: ERROR_CODE;
  public readonly isOperational: boolean;
  public readonly meta?: Record<string, any>;
  public readonly severity?: string;
  public readonly internalMessage?: string;
  public readonly responseStatus?: RESPONSE_STATUS;

  constructor(errorOptions: AppErrorOptions) {
    const {
      message,
      httpStatusCode = HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
      errorCode = ERROR_CODE.UNKNOWN_ERROR,
      meta,
      isOperational = true,
      severity,
      internalMessage,
      responseStatus,
    }: AppErrorOptions = errorOptions;
    super(message);
    this.httpStatusCode = httpStatusCode;
    this.isOperational = isOperational;
    this.meta = meta;
    this.severity = severity;
    this.errorCode = errorCode;
    this.internalMessage = internalMessage;
    this.responseStatus = responseStatus;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class UnauthorizedError extends AppError {
  constructor({
    internalMessage,
    meta
  }: AppErrorSubClassesOptions) {
    super({
      httpStatusCode: HTTP_STATUS_CODE.UNAUTHORIZED,
      responseStatus: RESPONSE_STATUS.ERROR,
      errorCode: ERROR_CODE.UNAUTHORIZED,
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
      httpStatusCode: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
      responseStatus: RESPONSE_STATUS.ERROR,
      errorCode: ERROR_CODE.INTERNAL_SERVER_ERROR,
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
      httpStatusCode: HTTP_STATUS_CODE.BAD_REQUEST,
      responseStatus: RESPONSE_STATUS.FAIL,
      errorCode: ERROR_CODE.BAD_REQUEST,
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
      httpStatusCode: HTTP_STATUS_CODE.UNAUTHORIZED,
      responseStatus: RESPONSE_STATUS.ERROR,
      errorCode: ERROR_CODE.INVALID_CREDENTIALS,
      severity: LogLevel.WARN,
      internalMessage,
      meta,
    });
  }
}
