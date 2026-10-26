import { PokemonRepository, Pokemon } from '../repositories/pokemon.repository.js';
import { NotFoundError, BadRequestError } from '../errors/AppError.js';

export class PokemonService {
  constructor(private pokemonRepository: PokemonRepository) {}

  async getPokemons(filters: { name?: string; limit?: number; offset?: number }): Promise<Pokemon[]> {
    return this.pokemonRepository.findAll(filters);
  }

  async getPokemonById(id: string): Promise<Pokemon> {
    const pokemon = await this.pokemonRepository.findById(id);
    if (!pokemon) {
      throw new NotFoundError(`Pokémon con ID ${id} no encontrado`);
    }
    return pokemon;
  }

  async createPokemon(data: { name: string; type: string; level: number }): Promise<Pokemon> {
    const existing = await this.pokemonRepository.findByName(data.name);
    if (existing) {
      throw new BadRequestError(`Ya existe un Pokémon con el nombre '${data.name}'`);
    }
    return this.pokemonRepository.create(data);
  }

  async deletePokemon(id: string): Promise<void> {
    const deleted = await this.pokemonRepository.delete(id);
    if (!deleted) {
      throw new NotFoundError(`Pokémon con ID ${id} no encontrado`);
    }
  }
}