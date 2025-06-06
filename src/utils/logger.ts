import pino, { destination, StreamEntry, Level } from 'pino';
import path from 'path';
import fs from 'fs';
import pretty from 'pino-pretty';
import { ENV } from './env';

export enum LogLevel {
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  DEBUG = 'debug',
}

const logDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}
const isDev = ENV.NODE_ENV !== 'production';
const logLevel: Level = ENV.LOG_LEVEL as Level;

const streams: StreamEntry[] = [];
if (isDev) {
  streams.push({
    level: logLevel,
    stream: pretty({
      sync: true,
      colorize: true,
      translateTime: 'HH:MM:ss',
      ignore: 'pid,hostname',
    }),
  });
} else {
  streams.push({
    level: logLevel,
    stream: destination({
      dest: path.join(logDir, 'app.log'),
      sync: true,
    }),
  });
  streams.push({
    level: logLevel,
    stream: process.stdout
  });
}

const logger = pino({
  level: logLevel,
  timestamp: pino.stdTimeFunctions.isoTime
}, pino.multistream(streams));

const log = (
  message: string,
  severity: LogLevel = LogLevel.INFO,
  meta?: Record<string, any>
) => {
  logger[severity](meta || {}, message);
};

export {
  log,
  logger
};
