import { User, UserDocument } from '../models/user.model';
import { log, LogLevel } from '../utils/logger';
import { AppError, BadRequest } from '../utils/AppError';
import { HTTP_STATUS } from '../utils/httpStatus';
import { sanitizeUser } from '../utils/santizers';
import { RegisterInput } from '../schemas/auth.schema';

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
      httpStatusCode: HTTP_STATUS.CONFLICT
    });
  }

  const user = new User({ email, password });
  await user.save();

  // remove password if returning the user to client
  const safeUser = sanitizeUser(user);

  log(`User created: ${safeUser.email}`, LogLevel.INFO);

  return safeUser;
};

export {
  createUser,
  findUserByEmail,
  findUserById,
  findUserByEmailWithPassword
};
