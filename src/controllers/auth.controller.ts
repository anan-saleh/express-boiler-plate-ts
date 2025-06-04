import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { InternalServerError, UnauthorizedError } from '../utils/AppError';
import { HTTP_STATUS } from '../utils/httpStatus';
import { log, LogLevel } from '../utils/logger';

export const loginUser = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', (err: any, user: any, info: { message?: string }) => {
    log('User at passport authenticate method loginUser', LogLevel.DEBUG, { user, err, info });
    if (err) {
      return next(new InternalServerError({
        message: 'Authentication failed',
      }));
    }

    if (!user) {
      return next(new UnauthorizedError({
        message: info?.message || 'Invalid credentials'
      }));
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(new InternalServerError({
          message: 'Login failed',
          meta: { err }
        }));
      }
      res.status(HTTP_STATUS.OK).json({ message: 'Login successful', user });
    });
  })(req, res, next);
};

export const logoutUser = (req: Request, res: Response, next: NextFunction) => {
  req.logout((err) => {
    if (err) {
      return next(new InternalServerError({
        message: 'Logout failed',
      }));
    }
    res.clearCookie('connect.sid');
    res.status(HTTP_STATUS.OK).json({ message: 'Logged out successfully' });
  });
};
