import { Schema, model, HydratedDocument } from 'mongoose';
import bcrypt from 'bcrypt';
import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from '../utils/validators/password';
import { sanitizeUser } from '../utils/sanitizers';


export interface IUser {
  email: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
  sanitize(): Omit<this, 'password' | '__v' | 'comparePassword' | 'sanitize'>;
}

export type SafeUser = Pick<UserDocument, 'email' | '_id'>;

// with zod validation no need to keep in password minlength and maxlength,
// however they were kept as another layer of protection
const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [MIN_PASSWORD_LENGTH, `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`],
    maxlength: [MAX_PASSWORD_LENGTH, `Password must be no more than ${MAX_PASSWORD_LENGTH} characters long`],
    select: false,
  }
}, {
  timestamps: true,
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const saltRounds = 10;
  this.password = await bcrypt.hash(this.password, saltRounds);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.sanitize = function (): SafeUser {
  const sanitizedUser = sanitizeUser(this.toObject());
  return sanitizedUser;
};

export type UserDocument = HydratedDocument<IUser>;

export const User = model<IUser>('User', userSchema);
