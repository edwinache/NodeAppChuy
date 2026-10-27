import { Router, Request, Response } from 'express';
import { pokemonService } from '../services/pokemon.services.js';
import {
  createPokemonSchema,
  listPokemonQuerySchema,
} from '../schemas/pokemon.schema.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';

const router = Router();

// GET /api/v1/pokemon
router.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const query = listPokemonQuerySchema.parse(req.query);
    const result = await pokemonService.list(query);
    res.json({
      status: 'success',
      data: result.data,
      meta: {
        total: result.total,
        limit: query.limit,
        offset: query.offset,
      },
    });
  })
);

// GET /api/v1/pokemon/:id
router.get(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const pokemon = await pokemonService.getById(id);
    res.json({
      status: 'success',
      data: pokemon,
    });
  })
);

// POST /api/v1/pokemon
router.post(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const input = createPokemonSchema.parse(req.body);
    const created = await pokemonService.create(input);
    res.status(201).json({
      status: 'success',
      data: created,
    });
  })
);

// DELETE /api/v1/pokemon/:id
router.delete(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    await pokemonService.delete(id);
    res.status(204).send();
  })
);

export { router as pokemonRouter };
