// Configures and exports the application logger (pino).
import pino from 'pino';

export const logger = pino({
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  transport: {
    target: 'pino-pretty', // Use pino-pretty for development readability
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname',
    },
  },
});
