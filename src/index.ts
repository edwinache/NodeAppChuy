import express from 'express';
import { env } from './config/env.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { AppError } from './errors/AppError.js';

const app = express();

app.use(express.json());

// Sample health route
app.get('/', (_req, res) => {
  res.json({
    message: 'Hello from NodeAppChuy running with TypeScript & Docker!',
    environment: env.NODE_ENV,
  });
});

// Test route to simulate an operational error
app.get('/test-error', () => {
  throw AppError.badRequest('This is a simulated bad request error');
});

// Test route to simulate an unexpected crash
app.get('/test-crash', () => {
  throw new Error('Something went horribly wrong in the database!');
});

// 1. Catch 404s for unhandled routes
app.use(notFoundHandler);

// 2. Centralized error handling middleware (must be last)
app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
});
