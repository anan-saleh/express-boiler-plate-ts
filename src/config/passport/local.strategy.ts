import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { findUserByEmailWithPassword } from '../../services/user.service';
import { log, LogLevel } from '../../utils/logger';
import { UnauthorizedError } from '../../utils/AppError';
import { backupSanitizer } from '../../services/auth.service';

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (email, password, done) => {
  try {
    log(`Attempting to find user with ${email} at local strategy for passport`, LogLevel.DEBUG, { email });
    const user = await findUserByEmailWithPassword(email);
    if (!user?._id) {
      // await createUser({ email, password });
      log(`User not found: ${email}`, LogLevel.WARN);
      return done(new UnauthorizedError({
        message: 'User not found',
        meta: { email },
      }));
    }

    const isMatch = await user?.comparePassword(password);

    if (!isMatch) {
      log(`Invalid password for ${email}`, LogLevel.WARN);
      return done(new UnauthorizedError({
        message: 'Invalid password',
        meta: { email },
      }));
    }
    let safeUser = user.sanitize();
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
    log('User found at local strategy for passport', LogLevel.DEBUG, { user: sanitizedUser });
    return done(null, sanitizedUser);
  } catch (err) {
    log('Error at passport local strategy', LogLevel.ERROR, { err });
    return done(err);
  }
}));
