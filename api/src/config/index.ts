// Centralized application configuration loaded from environment variables.
import { envSchema } from './env.validation';
import { logger } from '@/utils/logger';

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  if (process.env.NODE_ENV !== 'production') {
    logger.error('❌ Invalid environment variables:', parsedEnv.error.format());
  }
  throw new Error('Invalid environment variables');
}

export const config = {
  port: parsedEnv.data.PORT,
  nodeEnv: parsedEnv.data.NODE_ENV,
  // Export other config values here
  // databaseUrl: parsedEnv.data.DATABASE_URL,
};
