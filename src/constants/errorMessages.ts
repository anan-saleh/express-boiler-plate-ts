import { ErrorCode } from './errorCodes';

export const ERROR_MESSAGES = {
  // Auth & User Errors
  [ErrorCode.USER_ALREADY_EXISTS]: 'An account with this email already exists.',
  [ErrorCode.USER_NOT_FOUND]: 'No account found for the provided credentials.',
  [ErrorCode.INVALID_CREDENTIALS]: 'Email or password is incorrect.',
  [ErrorCode.EMAIL_NOT_VERIFIED]: 'Please verify your email address to continue.',
  [ErrorCode.ACCOUNT_LOCKED]: 'Your account has been locked. Contact support.',
  [ErrorCode.UNAUTHORIZED]: 'You must be logged in to access this resource.',
  [ErrorCode.FORBIDDEN]: 'You do not have permission to perform this action.',
  [ErrorCode.SESSION_EXPIRED]: 'Your session has expired. Please log in again.',
  [ErrorCode.TOKEN_EXPIRED]: 'Your session token has expired.',
  [ErrorCode.TOKEN_INVALID]: 'The token provided is invalid or malformed.',

  // Validation & Input Errors
  [ErrorCode.VALIDATION_ERROR]: 'One or more fields failed validation.',
  [ErrorCode.MISSING_FIELDS]: 'Required fields are missing.',
  [ErrorCode.INVALID_INPUT]: 'Invalid input data provided.',
  [ErrorCode.INVALID_EMAIL_FORMAT]: 'Please enter a valid email address.',
  [ErrorCode.PASSWORD_TOO_WEAK]: 'Password is too weak. Use a mix of letters, numbers, and symbols.',
  [ErrorCode.PASSWORD_TOO_SHORT]: 'Password must be at least 8 characters long.',
  [ErrorCode.PASSWORD_TOO_LONG]: 'Password must not exceed 128 characters.',
  [ErrorCode.FIELD_TOO_LONG]: 'Input is too long. Please shorten it.',

  // Server / System Errors
  [ErrorCode.INTERNAL_SERVER_ERROR]: 'An unexpected error occurred. Please try again later.',
  [ErrorCode.SERVICE_UNAVAILABLE]: 'Service is currently unavailable. Please try again later.',
  [ErrorCode.UNKNOWN_ERROR]: 'An unknown error occurred. Please contact support.',

  //  Database Errors
  [ErrorCode.DATABASE_ERROR]: 'A database error occurred. Please try again.',
  [ErrorCode.DUPLICATE_KEY]: 'A record with this value already exists.',
  [ErrorCode.DOCUMENT_NOT_FOUND]: 'The requested item could not be found.',

  // Security & Access Errors
  [ErrorCode.CSRF_TOKEN_INVALID]: 'Invalid CSRF token.',
  [ErrorCode.TOO_MANY_REQUESTS]: 'Too many requests. Please wait and try again.',
  [ErrorCode.RATE_LIMIT_EXCEEDED]: 'Rate limit exceeded. Try again later.',
  [ErrorCode.ACCESS_DENIED]: 'Access denied for this resource.',

  // API & Routing Errors
  [ErrorCode.NOT_FOUND]: 'The requested resource was not found.',
  [ErrorCode.ROUTE_NOT_FOUND]: 'This route does not exist.',
  [ErrorCode.METHOD_NOT_ALLOWED]: 'HTTP method not allowed on this route.',
  [ErrorCode.BAD_REQUEST]: 'Malformed request. Check your input and try again.',

  // File Upload Errors
  [ErrorCode.FILE_TOO_LARGE]: 'The uploaded file exceeds the size limit.',
  [ErrorCode.UNSUPPORTED_FILE_TYPE]: 'This file type is not supported.',
};
