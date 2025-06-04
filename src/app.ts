import './config/env';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import './config/passport/index';
import { ENV } from './utils/env';
import { errorHandler } from './middlewares/errorHandler';

const app  = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: ENV.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: ENV.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: ENV.NODE_ENV === 'production' ? 'none' : 'lax',
  },
}));

app.use(passport.initialize());
app.use(passport.session());


app.use(errorHandler);

export {
  app,
};
