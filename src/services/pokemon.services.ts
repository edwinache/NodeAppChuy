import {
  pokemonRepository,
  PokemonRepository,
} from '../repositories/pokemon.repository.js';
import {
  CreatePokemonInput,
  ListPokemonQuery,
} from '../schemas/pokemon.schema.js';
import { NotFoundError, BadRequestError } from '../errors/AppError.js';

export class PokemonService {
  constructor(private readonly repo: PokemonRepository = pokemonRepository) {}

  async list(query: ListPokemonQuery) {
    return this.repo.findAll({
      name: query.name,
      limit: query.limit,
      offset: query.offset,
    });
  }

  async getById(id: number) {
    if (isNaN(id) || id <= 0) {
      throw new BadRequestError('Pokemon ID must be a positive integer');
    }

    const pokemon = await this.repo.findById(id);
    if (!pokemon) {
      throw new NotFoundError(`Pokemon with ID ${id} not found`);
    }
    return pokemon;
  }

  async create(input: CreatePokemonInput) {
    const existing = await this.repo.findByName(input.name);
    if (existing) {
      throw new BadRequestError(
        `Pokemon with name '${input.name}' already exists`
      );
    }

    return this.repo.create(input);
  }

  async delete(id: number) {
    if (isNaN(id) || id <= 0) {
      throw new BadRequestError('Pokemon ID must be a positive integer');
    }

    const deleted = await this.repo.delete(id);
    if (!deleted) {
      throw new NotFoundError(`Pokemon with ID ${id} not found`);
    }
  }
}

export const pokemonService = new PokemonService();
