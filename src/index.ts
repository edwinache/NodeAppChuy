import express from 'express';
import { env } from './config/env.js';
import { requestLogger } from './middlewares/requestLogger.js';
import { pokemonRouter } from './routes/pokemon.routes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

const app = express();

// 1. Request logging (mount first)
app.use(requestLogger);

// 2. Body parsing
app.use(express.json());

// 3. Base health route
app.get('/', (_req, res) => {
  res.json({
    message: 'Hello from NodeAppChuy running with TypeScript & Docker!',
    environment: env.NODE_ENV,
  });
});

// 4. API routes
app.use('/api/v1/pokemon', pokemonRouter);

// 5. 404 Fallback
app.use(notFoundHandler);

// 6. Central Error Handler (must be last)
app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
});
