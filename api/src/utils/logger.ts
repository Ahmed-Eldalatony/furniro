import pino from 'pino';

const isProduction = process.env.NODE_ENV === 'production';

export const logger = pino({
  level: isProduction ? 'silent' : (process.env.NODE_ENV === 'development' ? 'debug' : 'info'),
  transport: isProduction ? undefined : { // Disable transport in production
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname',
    },
  },
});
