import { User, UserDocument } from '../models/user.model';
import { log, LogLevel } from '../utils/logger';
import { AppError } from '../utils/AppError';
import { HTTP_STATUS } from '../utils/httpStatus';

interface CreateUserInput {
  email: string;
  password: string;
}

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

const createUser = async ({ email, password }: CreateUserInput) => {

  log(`Attempting to create user: ${email}`, LogLevel.DEBUG);

  if (!email || !password) {
    throw new AppError({
      message: 'Email and password are required',
      httpStatusCode: HTTP_STATUS.BAD_REQUEST,
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

  log(`User created: ${user.email}`, LogLevel.INFO);

  return user;
};

export {
  createUser,
  findUserByEmail,
  findUserById,
  findUserByEmailWithPassword
};
