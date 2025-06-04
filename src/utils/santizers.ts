import { UserDocument } from '../models/user.model';

export const sanitizeUser = (user: UserDocument) => {
  const { password, __v, comparePassword,  ...safeUser} = user.toObject();
  return safeUser;
};
