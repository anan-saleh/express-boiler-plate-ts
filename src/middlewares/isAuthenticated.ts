import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../utils/AppError';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return next(new UnauthorizedError('You must be logged in to access this route'));
};
