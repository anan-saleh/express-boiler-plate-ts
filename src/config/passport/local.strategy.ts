import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { findUserByEmailWithPassword } from '../../services/user.service';
import { log, LogLevel } from '../../utils/logger';
import { InvalidCredentialsError } from '../../utils/AppError';
import { retryAttemptToSanitizeUser } from '../../services/auth.service';

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (email, password, done) => {
  try {
    log(`Attempting to find user with ${email} at local strategy for passport`, LogLevel.DEBUG, { email });
    const user = await findUserByEmailWithPassword(email);
    if (!user?._id) {
      // await createUser({ email, password });
      return done(new InvalidCredentialsError({
        internalMessage: 'User was not found for this email',
        meta: {
          email
        },
      }));
    }

    const isMatch = await user?.comparePassword(password);

    if (!isMatch) {
      return done(new InvalidCredentialsError({
        internalMessage: 'User password did not match',
        meta: {
          email
        },
      }));
    }
    const safeUser = user.sanitize();
    let backupSanitizedUser;

    // in case the sanitizer in mongoose method did not work
    // keep this a proper security measurement
    // ITS VERY BAD TO RETURN PASSWORD ALWAYS PROCEED WITH EXTRA CAUTION

    if ('password' in safeUser) {
      backupSanitizedUser = await retryAttemptToSanitizeUser(user);
    }

    const sanitizedUser = backupSanitizedUser?._id ? backupSanitizedUser : safeUser;
    log('User found at local strategy for passport', LogLevel.DEBUG, { user: sanitizedUser });
    return done(null, sanitizedUser);
  } catch (err) {
    log('Error at passport local strategy', LogLevel.ERROR, { err });
    return done(err);
  }
}));
