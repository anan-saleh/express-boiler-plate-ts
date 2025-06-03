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
    if (err instanceof mongoose.Error.MongooseServerSelectionError) {
      log('Error connecting to DB', LogLevel.ERROR, {
        type: err.name,
        message: err.message,
        stack: err.stack,
      });
    }
    process.exit(1);
  }
};

