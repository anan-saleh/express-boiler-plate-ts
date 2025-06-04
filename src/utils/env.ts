// isolate this file from every import there is since it will be used everywhere
// inorder to avoid conflict
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
};
