import { z } from 'zod';

export const pokemonTypeEnum = z.enum([
  'Normal',
  'Fire',
  'Water',
  'Grass',
  'Electric',
  'Ice',
  'Fighting',
  'Poison',
  'Ground',
  'Flying',
  'Psychic',
  'Bug',
  'Rock',
  'Ghost',
  'Dragon',
  'Steel',
  'Fairy',
]);

// Creation Payload Validation
export const createPokemonSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  type: z.array(pokemonTypeEnum).min(1, 'At least one type is required'),
  hp: z.number().int().positive('HP must be a positive integer'),
  attack: z.number().int().positive('Attack must be a positive integer'),
  defense: z.number().int().positive('Defense must be a positive integer'),
  speed: z.number().int().positive('Speed must be a positive integer'),
});

// Query Parameters Validation
export const listPokemonQuerySchema = z.object({
  name: z.string().trim().optional(),
  limit: z.coerce.number().int().positive().max(100).default(10),
  offset: z.coerce.number().int().nonnegative().default(0),
});

export type Pokemon = z.infer<typeof createPokemonSchema> & { id: number };
export type CreatePokemonInput = z.infer<typeof createPokemonSchema>;
export type ListPokemonQuery = z.infer<typeof listPokemonQuerySchema>;
