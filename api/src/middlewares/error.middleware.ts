// Centralized error handling middleware for Express.
import { Request, Response, NextFunction } from 'express';
import { logger } from '@/utils/logger';
import { ApiResponse } from '@/utils/api-response'; // Will create this next

// Basic error handler - customize as needed
export const errorHandler = (
  err: any, // Use a more specific error type if you have custom errors
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (process.env.NODE_ENV !== 'production') {
    logger.error(err); // Log the error details
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || 'An unexpected error occurred';

  // Send a standardized error response
  res.status(statusCode).json(ApiResponse.error(message, statusCode));
};
