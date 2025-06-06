import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../utils/AppError';
import { sanitizeObjectFromPassword } from '../utils/sanitizers';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return next(new UnauthorizedError({
    internalMessage: 'isAuthenticated - Failed to authenticate',
    meta: {
      requestBody: sanitizeObjectFromPassword(req.body)
    },
  }));
};
