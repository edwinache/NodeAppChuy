import express from 'express';
import { env } from './config/env.js';

const app = express();

app.use(express.json());

app.get('/', (_req, res) => {
  res.json({
    message: 'Hello from NodeAppChuy running with TypeScript & Docker!',
    environment: env.NODE_ENV,
  });
});

app.listen(env.PORT, () => {
  console.log(`Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
});
