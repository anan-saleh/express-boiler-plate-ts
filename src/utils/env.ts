import dotenv from 'dotenv';
import { log, LogLevel } from "./logger";
dotenv.config();

export const getEnvVariable = (key: string): string | undefined => {
  const value = process.env[key];
  if (!value) {
    log(`Missing environment variable ${key}`, LogLevel.ERROR);
  } else {
    return value;
  }
}

export const ENV = {
  PORT: parseInt(String(getEnvVariable('PORT'))),
  LOG_LEVEL: getEnvVariable('LOG_LEVEL'),
};
