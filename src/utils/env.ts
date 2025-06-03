import { log, LogLevel } from "./logger";

export const getEnvVariable = (key: string): string | undefined => {
  const value = process.env[key];
  if (!value) {
    log(`Missing environment variable ${key}`, LogLevel.ERROR);
  } else {
    return value;
  }
}

const MONGO_COLLECTION = 'SomeCollection';

export const ENV = {
  PORT: parseInt(String(getEnvVariable('PORT'))),
  LOG_LEVEL: getEnvVariable('LOG_LEVEL'),
  MONGO_URI: getEnvVariable('MONGO_URI') || `mongodb://127.0.0.1:27017/${MONGO_COLLECTION}`,
};
