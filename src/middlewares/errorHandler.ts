import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { AppError } from '../errors/AppError.js';
import { env } from '../config/env.js';

export const errorHandler: ErrorRequestHandler = (
  err: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: 'error',
      statusCode: err.statusCode,
      message: err.message,
      ...(env.NODE_ENV === 'development' && { stack: err.stack }),
    });
    return;
  }

  console.error('💥 Unexpected Server Error:', err);

  res.status(500).json({
    status: 'error',
    statusCode: 500,
    message:
      env.NODE_ENV === 'production' ? 'Internal server error' : err.message,
    ...(env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
