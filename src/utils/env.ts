// Do not import here anything unless it's a package
// This file will be imported everywhere so to avoid conflict keep it as it is
export const getEnvVariable = (key: string): string | undefined => {
  const value = process.env[key];
  if (!value) {
    console.error(`Missing environment variable ${key}`);
  } else {
    return value;
  }
};

const MONGO_COLLECTION = 'SomeCollection';

export const ENV = {
  PORT: parseInt(String(getEnvVariable('PORT'))),
  LOG_LEVEL: getEnvVariable('LOG_LEVEL') || 'info',
  MONGO_URI: getEnvVariable('MONGO_URI') || `mongodb://127.0.0.1:27017/${MONGO_COLLECTION}`,
  NODE_ENV: getEnvVariable('NODE_ENV') || 'production',
  SESSION_SECRET: getEnvVariable(('SESSION_SECRET')) || 'random-dev-key'
};
