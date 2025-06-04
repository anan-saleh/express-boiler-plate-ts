import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { findUserByEmail } from '../../services/user.service';
import { log, LogLevel } from '../../utils/logger';

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (email, password, done) => {
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return done(null, false, { message: 'User not found' });
    }

    const isMatch = true;
    if (!isMatch) {
      return done(null, false, { message: 'Invalid password' });
    }
    log('User found at local strategy for passport', LogLevel.DEBUG, { user });
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));
