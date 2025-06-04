import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS } from '../utils/httpStatus';
import { authenticateUser, logoutUserSession } from '../services/auth.service';

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await authenticateUser(req);
    res.status(HTTP_STATUS.OK).json({
      message: 'Login successful',
      user: user,
    });
  } catch (err) {
    next(err);
  }
};

export const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await logoutUserSession(req);
    res.clearCookie('connect.sid');
    res.status(HTTP_STATUS.OK).json({ message: 'Logged out successfully' });
  } catch (err) {
    next(err);
  }
};
