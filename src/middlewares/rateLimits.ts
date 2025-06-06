import rateLimit from 'express-rate-limit';

export enum LIMIT_TYPES {
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
  GENERAL = 'GENERAL',
}

const WINDOW_MS = {
  MINUTES_15: 15 * 60 * 1000,
  MINUTES_60: 60 * 60 * 1000,
  MINUTES_1: 60 * 1000,
} as const;

const WINDOW_MS_BY_TYPE: Record<LIMIT_TYPES, number> = {
  [LIMIT_TYPES.LOGIN]: WINDOW_MS.MINUTES_15,
  [LIMIT_TYPES.REGISTER]: WINDOW_MS.MINUTES_60,
  [LIMIT_TYPES.FORGOT_PASSWORD]: WINDOW_MS.MINUTES_15,
  [LIMIT_TYPES.GENERAL]: WINDOW_MS.MINUTES_1,
};

const LIMIT_BY_TYPE: Record<LIMIT_TYPES, number> = {
  [LIMIT_TYPES.LOGIN]: 5,
  [LIMIT_TYPES.REGISTER]: 3,
  [LIMIT_TYPES.FORGOT_PASSWORD]: 3,
  [LIMIT_TYPES.GENERAL]: 100,
};

export const rateLimits = (type: LIMIT_TYPES) => {
  return rateLimit({
    windowMs: WINDOW_MS_BY_TYPE[type],
    limit: LIMIT_BY_TYPE[type],
    message: {
      status: 'fail',
      errorCode: 'TOO_MANY_REQUESTS',
      message: 'Too many requests. Please try again later.',
    },
    standardHeaders: true,
    legacyHeaders: false,
  });
};
