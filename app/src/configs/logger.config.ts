/**
 * Morgan and Winston logger configuration
 */

import winston, { LoggerOptions } from 'winston';

// Morgan logger configuration
const morganConfig = {
  format: ':method :url :status :response-time ms - :res[content-length]',
};

// Winston logger configuration
const winstonConfig: LoggerOptions = {
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.prettyPrint()),
      level: 'notice',
    }),
  ],
};

const loggerConfig = {
  morgan: morganConfig,
  winston: winstonConfig,
};

export default loggerConfig;
