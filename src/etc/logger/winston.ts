'use strict';
import { createLogger, format, transports } from 'winston';
import DailyRotateFile = require("winston-daily-rotate-file");

const fs = require('fs');
const path = require('path');
const env = process.env.NODE_ENV || 'development';

const logDir = 'log';

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const dailyRotateFileTransport = new DailyRotateFile({
  filename: `${logDir}/%DATE%-results.log`,
  datePattern: 'YYYY-MM-DD'
});

export const logger = createLogger({
  // change level if in dev environment versus production
  // { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
  level: env === 'development' ? 'verbose' : 'warn',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.Console({
      level: env === 'development' ? 'verbose' : 'warn',
      format: format.combine(
        format.colorize(),
        format.printf(
          info => `${info.timestamp} ${info.level}: ${info.message}`
        )
      )
    }),
    dailyRotateFileTransport
  ]
});