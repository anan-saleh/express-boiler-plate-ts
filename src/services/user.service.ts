import { User, UserDocument } from '../models/user.model';
import { log, LogLevel } from '../utils/logger';
import { BadRequest, InvalidCredentialsError } from '../utils/AppError';
import { RegisterInput } from '../schemas/auth.schema';
import { retryAttemptToSanitizeUser } from './auth.service';

const findUserByEmailWithPassword = async (email: string): Promise<UserDocument | null> => {
  log(`Attempting finding user with password for email: ${email}`, LogLevel.DEBUG);
  const user = await User.findOne({ email }).select('+password').exec();
  log(`User found: ${user?.email}`, LogLevel.DEBUG);
  return user;
};

const findUserById = async (id: string): Promise<UserDocument | null> => {
  log(`Attempting to find user by id: ${id}`, LogLevel.DEBUG);
  const user = await User.findOne({ _id: id }).exec();
  log(`User found: ${user?.email}`, LogLevel.DEBUG);
  return user;
};

const findUserByEmail = async (email: string): Promise<UserDocument | null> => {
  log(`Attempting to find user by email: ${email}`, LogLevel.DEBUG);
  const user = await User.findOne({ email }).exec();
  log(`User found: ${user?.email}`, LogLevel.DEBUG);
  return user;
};

const createUser = async ({ email, password }: RegisterInput) => {

  log(`Attempting to create user: ${email}`, LogLevel.INFO);

  // with zod validation this is not needed,
  // but it's kept here for debug purposes in case it avoided zod
  if (!email || !password) {
    throw new InvalidCredentialsError({
      internalMessage: 'createUser - By Passed http request with no email or password',
      meta: { email }
    });
  }

  const existingUser = await findUserByEmail(email);
  if (existingUser?._id) {
    throw new BadRequest({
      internalMessage: `${existingUser.email} Is attempting to register but user already exists`,
      meta: {
        email: existingUser.email,
      },
    });
  }

  const user = new User({ email, password });
  await user.save();

  // remove password if returning the user to client
  const safeUser = user.sanitize();
  let backupSanitizedUser;

  // in case the sanitizer in mongoose method did not work
  // keep this as a proper security measurement
  // ITS VERY BAD TO RETURN PASSWORD ALWAYS PROCEED WITH EXTRA CAUTION

  if ('password' in safeUser) {
    backupSanitizedUser = await retryAttemptToSanitizeUser(user);
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
