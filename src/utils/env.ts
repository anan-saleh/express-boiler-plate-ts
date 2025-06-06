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

export const ENV = {
  PORT: parseInt(String(getEnvVariable('PORT'))),
  LOG_LEVEL: String(getEnvVariable('LOG_LEVEL')),
  MONGO_URI: String(getEnvVariable('MONGO_URI')),
  NODE_ENV: String(getEnvVariable('NODE_ENV')),
  SESSION_SECRET: String(getEnvVariable(('SESSION_SECRET')))
};
