import mongoose from 'mongoose';
import { ENV } from '../utils/env';
import { log, LogLevel } from '../utils/logger';

export const connectDB = async () => {
  try {
    await mongoose.connect(ENV.MONGO_URI, {
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      retryWrites: true,
      maxConnecting: 3,
    });
  } catch (err) {
    const errorMessage = 'Error connecting to DB';
    if (err instanceof mongoose.Error.MongooseServerSelectionError) {
      log(errorMessage, LogLevel.ERROR, {
        type: err.name,
        message: err.message,
        stack: err.stack,
      });
    } else {
      log(errorMessage, LogLevel.ERROR, { err });
    }
    process.exit(1);
  }
};

