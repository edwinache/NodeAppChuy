import express from 'express';
import { env } from './config/env.js';
import { pokemonRouter } from './routes/pokemon.routes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

const app = express();

app.use(express.json());

// Base health route
app.get('/', (_req, res) => {
  res.json({
    message: 'Hello from NodeAppChuy running with TypeScript & Docker!',
    environment: env.NODE_ENV,
  });
});

// Mount Pokémon API routes
app.use('/api/v1/pokemon', pokemonRouter);

// 404 handler for unknown routes
app.use(notFoundHandler);

// Central error handler (must be last)
app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
});
