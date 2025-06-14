import { UserDocument } from '../models/user.model';
import { isFunction } from './helpers';

export const sanitizeUser = (user: UserDocument) => {
  const notSafeUser = isFunction(user?.toObject) ? user.toObject() : user;
  const { password, __v, comparePassword, sanitize,  ...safeUser} = notSafeUser;
  return safeUser;
};

interface objectWithPassword {
  password?: string;
}

export const sanitizeObjectFromPassword = (obj: objectWithPassword) => {
  if (obj && obj.password) {
    const { password, ...safeObj } = obj;
    return safeObj;
  } else {
    return obj;
  }
};
