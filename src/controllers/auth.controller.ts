import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS } from '../utils/httpStatus';
import { authenticateUser, logoutUserSession } from '../services/auth.service';
import { createUser } from '../services/user.service';
import { RegisterInput, LoginInput } from '../schemas/auth.schema';
import { catchAsync } from '../utils/catchAsync';

export const registerUser = catchAsync(async (req: Request<{}, {}, RegisterInput>, res: Response, next: NextFunction) => {
  const user = await createUser(req.body);
  res.status(HTTP_STATUS.CREATED).json({ message: 'User registered successfully', user });
});

export const loginUser = catchAsync(async (req: Request<{}, {}, LoginInput>, res: Response, next: NextFunction) => {
  const user = await authenticateUser(req, next);
  res.status(HTTP_STATUS.OK).json({
    message: 'Login successful',
    user: user,
  });
});

export const logoutUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  await logoutUserSession(req);
  res.clearCookie('connect.sid');
  res.status(HTTP_STATUS.OK).json({ message: 'Logged out successfully' });
});
