import passport from 'passport';
import './local.strategy';

import { findUserById } from '../../services/user.service';

passport.serializeUser((user: any, done) => {
  done(null, user?._id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await findUserById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
