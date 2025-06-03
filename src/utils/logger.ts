import pino from 'pino';
import path from 'path';
import fs from 'fs';

export enum LogLevel {
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  DEBUG = 'debug',
};

const logDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  timestamp: pino.stdTimeFunctions.isoTime,
  transport: {
    targets: [
      {
        target: 'pino-pretty',
        level: 'debug',
        options: {
          colorize: true,
          translateTime: 'HH:MM:ss',
          ignore: 'pid,hostname',
        },
      },
      {
        target: 'pino/file',
        level: 'info',
        options: {
          destination: path.join(logDir, 'app.log'),
        },
      },
    ],
  },
});

export function log(
  message: string,
  severity: LogLevel = LogLevel.INFO,
  meta?: Record<string, any>
) {
  logger[severity](meta || {}, message);
}

export { logger };
