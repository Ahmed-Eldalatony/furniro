// Function to create and configure the Express application instance.
import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import pinoHttp from 'pino-http';
import { logger } from '@/utils/logger';
import { errorHandler } from '@/middlewares/error.middleware';
import { mainRouter } from '@/routes';

export function createApp(): Application {
  const app = express();

  // Security Middleware
  app.use(helmet());
  app.use(cors());

  // Logging Middleware
  app.use(pinoHttp({ logger }));

  // Body Parsing Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Routes
  app.use('/api', mainRouter); // Example base path

  // Error Handling Middleware (Must be last)
  app.use(errorHandler);

  return app;
}
