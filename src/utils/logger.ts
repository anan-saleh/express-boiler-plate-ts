import pino, { destination, StreamEntry } from 'pino';
import path from 'path';
import fs from 'fs';
import pretty from 'pino-pretty';
import { ENV } from './env';

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

const isDev = ENV.NODE_ENV !== 'production';
const logLevel = ENV.LOG_LEVEL || 'info';

const streams: StreamEntry[] = [];
if (isDev) {
  streams.push({
    stream: pretty({
      sync: true,
      colorize: true,
      translateTime: 'HH:MM:ss',
      ignore: 'pid,hostname',
    }),
  });
} else {
  streams.push({
    stream: destination(path.join(logDir, 'app.log')),
  });
  streams.push({
    stream: process.stdout
  });
}

const logger = pino({
  level: logLevel,
  timestamp: pino.stdTimeFunctions.isoTime
}, pino.multistream(streams));

export function log(
  message: string,
  severity: LogLevel = LogLevel.INFO,
  meta?: Record<string, any>
) {
  logger[severity](meta || {}, message);
}

export { logger };
