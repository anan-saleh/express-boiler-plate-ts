import { Schema, model, HydratedDocument } from 'mongoose';

export interface IUser {
  email: string;
  password: string;
}

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
    minlength: [8, 'Password must be at least 8 characters'],
    select: false,
  }
}, {
  timestamps: true,
});

export type UserDocument = HydratedDocument<IUser>;

export const User = model<IUser>('User', userSchema);
