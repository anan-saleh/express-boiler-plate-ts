import { Request } from 'express';
import passport from 'passport';
import { UserDocument } from '../models/user.model';
import { UnauthorizedError, InternalServerError } from '../utils/AppError';
import { log, LogLevel } from '../utils/logger';
import { LoginInput } from '../schemas/auth.schema';
import { sanitizeUser } from '../utils/sanitizers';

export const authenticateUser = (
  req: Request<{}, {}, LoginInput>,
): Promise<UserDocument> => {
  return new Promise((resolve, reject) => {
    passport.authenticate('local', (err: any, user: UserDocument, info: { message?: string }) => {
      log('Authenticating user with passport', LogLevel.DEBUG, { err, user, info });

      if (err) {
        return reject(new InternalServerError({ message: 'Authentication failed', meta: { err } }));
      }

      if (!user) {
        return reject(new UnauthorizedError({ message: info?.message || 'Invalid credentials' }));
      }

      req.logIn(user, (err) => {
        if (err) {
          return reject(new InternalServerError({ message: 'Login failed', meta: { err } }));
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
        return reject(new InternalServerError({ message: 'Logout failed' }));
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
