import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS_CODE } from '../constants/httpStatusCode';
import { authenticateUser, logoutUserSession } from '../services/auth.service';
import { createUser } from '../services/user.service';
import { RegisterInput, LoginInput } from '../schemas/auth.schema';
import { catchAsync } from '../utils/catchAsync';
import { SUCCESS_MESSAGES } from '../constants/successMessages';
import { RESPONSE_STATUS } from '../constants/responseStatus';

export const registerUser = catchAsync(async (req: Request<{}, {}, RegisterInput>, res: Response, next: NextFunction) => {
  const user = await createUser(req.body);
  res.status(HTTP_STATUS_CODE.CREATED).json({
    status: RESPONSE_STATUS.SUCCESS,
    message: SUCCESS_MESSAGES.USER_REGISTERED,
    user
  });
});

export const loginUser = catchAsync(async (req: Request<{}, {}, LoginInput>, res: Response, next: NextFunction) => {
  const user = await authenticateUser(req, next);
  res.status(HTTP_STATUS_CODE.OK).json({
    status: RESPONSE_STATUS.SUCCESS,
    message: SUCCESS_MESSAGES.USER_LOGGED_IN,
    user: user,
  });
});

export const logoutUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  await logoutUserSession(req);
  res.clearCookie('connect.sid');
  res.status(HTTP_STATUS_CODE.OK).json({
    status: RESPONSE_STATUS.SUCCESS,
    message: SUCCESS_MESSAGES.USER_LOGGED_OUT
  });
});
