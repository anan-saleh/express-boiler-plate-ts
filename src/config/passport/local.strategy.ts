import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { findUserByEmailWithPassword } from '../../services/user.service';
import { log, LogLevel } from '../../utils/logger';
import { UnauthorizedError } from '../../utils/AppError';

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
    const allowedUserProps = {
      _id: user._id,
      email: user.email
    };
    log('User found at local strategy for passport', LogLevel.DEBUG, { allowedUserProps });
    return done(null, allowedUserProps);
  } catch (err) {
    log('Error at passport local strategy', LogLevel.ERROR, { err });
    return done(err);
  }
}));
