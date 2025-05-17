// Function to create and configure the Express application instance.
import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
// import pinoHttp from 'pino-http';
// import { logger } from '@/utils/logger';
// import { errorHandler } from '@/middlewares/error.middleware';
import { mainRouter } from '@/routes';

// const isProduction = process.env.NODE_ENV === 'production';

// import { config } from '@/config';
export function createApp(): Application {
  const app = express();
  const port = 3000

  // Security Middleware
  app.use(helmet());
  app.use(cors());

  // Logging Middleware
  // app.use(pinoHttp({ logger }));

  // Body Parsing Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Routes
  app.use('/api', mainRouter); // Example base path

  // Error Handling Middleware (Must be last)

  // app.use(errorHandler);

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  })

  return app;
}
