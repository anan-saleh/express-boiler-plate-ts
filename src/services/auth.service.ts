import { NextFunction, Request } from 'express';
import passport from 'passport';
import { SafeUser, UserDocument } from '../models/user.model';
import { InternalServerError } from '../utils/AppError';
import { log, LogLevel } from '../utils/logger';
import { LoginInput } from '../schemas/auth.schema';
import { sanitizeUser } from '../utils/sanitizers';

export const authenticateUser = (
  req: Request<{}, {}, LoginInput>,
  next: NextFunction,
): Promise<UserDocument> => {
  return new Promise((resolve, reject) => {
    passport.authenticate('local', (err: any, user: UserDocument, info: { message?: string }) => {
      log('Authenticating user with passport', LogLevel.DEBUG, { err, user, info });

      if (err) {
        return next(err);
      }

      req.logIn(user, (err) => {
        if (err) {
          return reject(new InternalServerError({
            internalMessage: 'Login failed',
            meta: { err },
          }));
        }
        resolve(user);
      });
    })(req);
  });
};

export const logoutUserSession = (req: Request): Promise<void> => {
  return new Promise((resolve, reject) => {
    req.logout((err) => {
      if (err) {
        return reject(new InternalServerError({
          internalMessage: 'Logout failed',
          meta: { err },
        }));
      }
      resolve();
    });
  });
};

export const backupSanitizer = (user: UserDocument) => {
  log('PASSWORD DETECTED IN SANITIZED USER', LogLevel.ERROR, { email: user.email });
  // @ts-ignore
  const safeUser = sanitizeUser(user);
  log('Newly returned temp user', LogLevel.DEBUG, { safeUser });
  return safeUser;
};

const MAX_SANITIZE_ATTEMPTS = 3;
const RETRY_DELAY_MS = 50;

export const retryAttemptToSanitizeUser = async (user: UserDocument, attempts = 0): Promise<SafeUser> => {
  if (attempts === 0) {
    log('PASSWORD DETECTED IN SANITIZED USER', LogLevel.ERROR, { email: user.email });
  }

  if (attempts >= MAX_SANITIZE_ATTEMPTS) {
    log(`Failed to sanitize password for ${user.email} after ${MAX_SANITIZE_ATTEMPTS} attempts`, LogLevel.ERROR);
    const forcedSanitizedUser = {
      _id: user._id,
      email: user.email,
    } as SafeUser;
    return forcedSanitizedUser;
  }
  if (attempts > 0) {
    await new Promise((res) => {
      setTimeout(res, RETRY_DELAY_MS);
    });
  }

  const backupSanitizedUser = user.sanitize();

  if (!('password' in backupSanitizedUser)) {
    return backupSanitizedUser;
  }

  return retryAttemptToSanitizeUser(user, attempts + 1);
};
