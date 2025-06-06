import { UserDocument } from '../models/user.model';
import { isFunction } from './helpers';

export const sanitizeUser = (user: UserDocument) => {
  const notSafeUser = isFunction(user?.toObject) ? user.toObject() : user;
  const { password, __v, comparePassword, sanitize,  ...safeUser} = notSafeUser;
  return safeUser;
};
