import { z } from 'zod';
import { EMAIL_SCHEMA } from './email.schema';
import { PASSWORD_SCHEMA } from './password.schema';

export const registerSchema = z.object({
  body: z.object({
    email: EMAIL_SCHEMA,
    password: PASSWORD_SCHEMA,
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: EMAIL_SCHEMA,
    password: PASSWORD_SCHEMA,
  }),
});

export type RegisterInput = z.infer<typeof registerSchema>['body'];
export type LoginInput = z.infer<typeof loginSchema>['body'];
