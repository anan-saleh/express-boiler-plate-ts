import { NextFunction, Request, Response } from 'express';
import { Permissions, RolePermissions, Roles } from '../config/roles';
import { ForbiddenError, UnauthorizedError } from '../utils/AppError';
import { UserDocument } from '../models/user.model';
import { findUserByEmail } from '../services/user.service';
import { sanitizeUser } from '../utils/sanitizers';
import { log, LogLevel } from '../utils/logger';

export const isAuthorized =
  (requiredPermissions: Permissions[]) =>
    async (req: Request, res: Response, next: NextFunction) => {
      const user = req.user as Partial<UserDocument>;
      if (!user?._id) {
        return next(new UnauthorizedError({
          internalMessage: `Unauthorized attempt for ${req.ip}`,
        }));
      }
      const userEmail = user.email || '';
      const existedUser = await findUserByEmail(userEmail);

      if (!existedUser?._id) {
        return next(new UnauthorizedError({
          internalMessage: `Unauthorized attempt for ${req.ip} ${user.email}`,
        }));
      }
      let sanitizedExistingUser;
      if (existedUser?.password) {
        log('isAuthorized - PASSWORD DETECTED IN FIND USER By EMAIL METHOD', LogLevel.ERROR);
        sanitizedExistingUser = sanitizeUser(existedUser);
      }
      const safeUser = sanitizedExistingUser?._id ? sanitizedExistingUser : existedUser;
      const forbiddenErrorProps = {
        internalMessage: `FORBIDDEN ATTEMPT - User with email ${safeUser?.email} is attempting a forbidden request to ${req.path}`,
        meta: {
          _id: safeUser?._id,
          role: safeUser?.role,
        }
      };
      if (!safeUser?.role) {
        return next(new ForbiddenError(forbiddenErrorProps));
      }
      const userRole = safeUser?.role as Roles;
      const permissions = RolePermissions[userRole] || [];

      if (permissions.includes(Permissions.ALLOW_ALL) || requiredPermissions.every((perm) => permissions.includes(perm))) {
        return next();
      }

      return next(new ForbiddenError(forbiddenErrorProps));
    };
