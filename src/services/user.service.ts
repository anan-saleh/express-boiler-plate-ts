import { User, UserDocument } from '../models/user.model';
import { log, LogLevel } from '../utils/logger';
import { AppError, BadRequest } from '../utils/AppError';
import { HTTP_STATUS } from '../utils/httpStatus';
import { RegisterInput } from '../schemas/auth.schema';
import { sanitizeUser } from '../utils/sanitizers';
import { backupSanitizer } from './auth.service';

const findUserByEmailWithPassword = async (email: string): Promise<UserDocument | null> => {
  log(`Finding user with password for email: ${email}`, LogLevel.DEBUG);
  return await User.findOne({ email }).select('+password').exec();
};

const findUserById = async (id: string): Promise<UserDocument | null> => {
  log(`Attempting to find user by id: ${id}`, LogLevel.DEBUG);
  const user = await User.findOne({ _id: id }).exec();
  log(`User found: ${user}`, LogLevel.DEBUG);
  return user;
};

const findUserByEmail = async (email: string): Promise<UserDocument | null> => {
  log(`Attempting to find user by email: ${email}`, LogLevel.DEBUG);
  const user = await User.findOne({ email }).exec();
  log(`User found: ${user}`, LogLevel.DEBUG);
  return user;
};

const createUser = async ({ email, password }: RegisterInput) => {

  log(`Attempting to create user: ${email}`, LogLevel.DEBUG);

  // with zod validation this is not needed,
  // but it's kept as proper protection another layer of security
  if (!email || !password) {
    throw new BadRequest({
      message: 'Email and password are required',
    });
  }

  const existingUser = await findUserByEmail(email);
  if (existingUser?._id) {
    throw new AppError({
      message: 'Email already exists',
      httpStatusCode: HTTP_STATUS.CONFLICT,
      meta: {
        user: sanitizeUser(existingUser)
      },
      severity: LogLevel.WARN,
    });
  }

  const user = new User({ email, password });
  await user.save();

  // remove password if returning the user to client
  const safeUser = user.sanitize();
  let backupSanitizedUser;

  // in case the sanitizer in mongoose method did not work
  // keep this a proper security measurement
  // todo: make it recursively later 3 attempts then throw error
  // ITS VERY BAD TO RETURN PASSWORD ALWAYS PROCEED WITH EXTRA CAUTION
  // @ts-ignore
  if (safeUser?.password) {
    backupSanitizedUser = backupSanitizer(user);
  }

  const sanitizedUser = backupSanitizedUser?._id ? backupSanitizedUser : safeUser;

  log(`User created: ${sanitizedUser.email}`, LogLevel.INFO);

  return sanitizedUser;
};

export {
  createUser,
  findUserByEmail,
  findUserById,
  findUserByEmailWithPassword
};
