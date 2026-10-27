import dotenv from 'dotenv';
import { z } from 'zod';

// Load variables from .env file into process.env
dotenv.config();

// 1. Define schema and validation rules
const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  PORT: z.coerce.number().default(3000),
  // Add other required variables as your app expands:
  // DATABASE_URL: z.string().url(),
  // API_KEY: z.string().min(1),
});

// 2. Parse and validate process.env
const parseEnv = () => {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    console.error('❌ Invalid or missing environment variables:');
    console.error(JSON.stringify(result.error.format(), null, 2));
    process.exit(1);
  }

  return result.data;
};

// 3. Export validated, strongly-typed config object
export const env = parseEnv();
export type Env = z.infer<typeof envSchema>;
