import { Pokemon, CreatePokemonInput } from '../schemas/pokemon.schema.js';

export class PokemonRepository {
  private pokemons: Pokemon[] = [
    {
      id: 1,
      name: 'Bulbasaur',
      type: ['Grass', 'Poison'],
      hp: 45,
      attack: 49,
      defense: 49,
      speed: 45,
    },
    {
      id: 4,
      name: 'Charmander',
      type: ['Fire'],
      hp: 39,
      attack: 52,
      defense: 43,
      speed: 65,
    },
    {
      id: 7,
      name: 'Squirtle',
      type: ['Water'],
      hp: 44,
      attack: 48,
      defense: 65,
      speed: 43,
    },
    {
      id: 25,
      name: 'Pikachu',
      type: ['Electric'],
      hp: 35,
      attack: 55,
      defense: 40,
      speed: 90,
    },
  ];

  private nextId = 26;

  async findAll(filters?: {
    name?: string;
    limit?: number;
    offset?: number;
  }): Promise<{ data: Pokemon[]; total: number }> {
    let list = [...this.pokemons];

    if (filters?.name) {
      const search = filters.name.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(search));
    }

    const total = list.length;
    const offset = filters?.offset ?? 0;
    const limit = filters?.limit ?? 10;
    const data = list.slice(offset, offset + limit);

    return { data, total };
  }

  async findById(id: number): Promise<Pokemon | null> {
    const found = this.pokemons.find((p) => p.id === id);
    return found ?? null;
  }

  async findByName(name: string): Promise<Pokemon | null> {
    const found = this.pokemons.find(
      (p) => p.name.toLowerCase() === name.toLowerCase()
    );
    return found ?? null;
  }

  async create(input: CreatePokemonInput): Promise<Pokemon> {
    const newPokemon: Pokemon = {
      id: this.nextId++,
      ...input,
    };
    this.pokemons.push(newPokemon);
    return newPokemon;
  }

  async delete(id: number): Promise<boolean> {
    const initialLength = this.pokemons.length;
    this.pokemons = this.pokemons.filter((p) => p.id !== id);
    return this.pokemons.length < initialLength;
  }
}

export const pokemonRepository = new PokemonRepository();
