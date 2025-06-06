import { ERROR_CODE } from './errorCodes';

export const ERROR_MESSAGES: Record<ERROR_CODE, string> = {
  // Auth & User Errors
  [ERROR_CODE.USER_ALREADY_EXISTS]: 'An account with this email already exists.',
  [ERROR_CODE.USER_NOT_FOUND]: 'No account found for the provided credentials.',
  [ERROR_CODE.INVALID_CREDENTIALS]: 'Email or password is incorrect.',
  [ERROR_CODE.EMAIL_NOT_VERIFIED]: 'Please verify your email address to continue.',
  [ERROR_CODE.ACCOUNT_LOCKED]: 'Your account has been locked. Contact support.',
  [ERROR_CODE.UNAUTHORIZED]: 'You must be logged in to access this resource.',
  [ERROR_CODE.FORBIDDEN]: 'You do not have permission to perform this action.',
  [ERROR_CODE.SESSION_EXPIRED]: 'Your session has expired. Please log in again.',
  [ERROR_CODE.TOKEN_EXPIRED]: 'Your session token has expired.',
  [ERROR_CODE.TOKEN_INVALID]: 'The token provided is invalid or malformed.',

  // Validation & Input Errors
  [ERROR_CODE.VALIDATION_ERROR]: 'One or more fields failed validation.',
  [ERROR_CODE.MISSING_FIELDS]: 'Required fields are missing.',
  [ERROR_CODE.INVALID_INPUT]: 'Invalid input data provided.',
  [ERROR_CODE.INVALID_EMAIL_FORMAT]: 'Please enter a valid email address.',
  [ERROR_CODE.PASSWORD_TOO_WEAK]: 'Password is too weak. Use a mix of letters, numbers, and symbols.',
  [ERROR_CODE.PASSWORD_TOO_SHORT]: 'Password must be at least 8 characters long.',
  [ERROR_CODE.PASSWORD_TOO_LONG]: 'Password must not exceed 64 characters.',
  [ERROR_CODE.FIELD_TOO_LONG]: 'Input is too long. Please shorten it.',

  // Server / System Errors
  [ERROR_CODE.INTERNAL_SERVER_ERROR]: 'An unexpected error occurred. Please try again later.',
  [ERROR_CODE.SERVICE_UNAVAILABLE]: 'Service is currently unavailable. Please try again later.',
  [ERROR_CODE.UNKNOWN_ERROR]: 'An unknown error occurred. Please contact support.',

  // Database Errors
  [ERROR_CODE.DATABASE_ERROR]: 'A database error occurred. Please try again.',
  [ERROR_CODE.DUPLICATE_KEY]: 'A record with this value already exists.',
  [ERROR_CODE.DOCUMENT_NOT_FOUND]: 'The requested item could not be found.',

  // Security & Access Errors
  [ERROR_CODE.CSRF_TOKEN_INVALID]: 'Invalid CSRF token.',
  [ERROR_CODE.TOO_MANY_REQUESTS]: 'Too many requests. Please wait and try again.',
  [ERROR_CODE.RATE_LIMIT_EXCEEDED]: 'Rate limit exceeded. Try again later.',
  [ERROR_CODE.ACCESS_DENIED]: 'Access denied for this resource.',

  // API & Routing Errors
  [ERROR_CODE.NOT_FOUND]: 'The requested resource was not found.',
  [ERROR_CODE.ROUTE_NOT_FOUND]: 'This route does not exist.',
  [ERROR_CODE.METHOD_NOT_ALLOWED]: 'HTTP method not allowed on this route.',
  [ERROR_CODE.BAD_REQUEST]: 'Malformed request. Check your input and try again.',

  // File Upload Errors
  [ERROR_CODE.FILE_TOO_LARGE]: 'The uploaded file exceeds the size limit.',
  [ERROR_CODE.UNSUPPORTED_FILE_TYPE]: 'This file type is not supported.',
};
