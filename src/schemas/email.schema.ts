import { z } from 'zod';

export const EMAIL_SCHEMA = z
  .string()
  .trim()
  .email({ message: 'Please enter a valid email address' });
