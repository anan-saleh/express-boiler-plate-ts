import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { AppError, UnauthorizedError } from '../utils/AppError';
import { HTTP_STATUS } from '../utils/httpStatus';
import { log, LogLevel } from '../utils/logger';

export const loginUser = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', (err: any, user: any, info: { message?: string }) => {
    log('User at passport authenticate method loginUser', LogLevel.DEBUG, { user, err, info });
    if (err) {
      return next(new AppError('Authentication failed', HTTP_STATUS.INTERNAL_SERVER_ERROR));
    }

    if (!user) {
      return next(new UnauthorizedError(info?.message || 'Invalid credentials'));
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(new AppError('Login failed', HTTP_STATUS.INTERNAL_SERVER_ERROR, true, { err }));
      }
      res.status(HTTP_STATUS.OK).json({ message: 'Login successful', user });
    });
  })(req, res, next);
};

export const logoutUser = (req: Request, res: Response, next: NextFunction) => {
  req.logout((err) => {
    if (err) {
      return next(new AppError('Logout failed', HTTP_STATUS.INTERNAL_SERVER_ERROR));
    }
    res.clearCookie('connect.sid');
    res.status(HTTP_STATUS.OK).json({ message: 'Logged out successfully' });
  });
};
