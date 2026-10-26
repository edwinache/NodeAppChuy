export interface Pokemon {
  id: string;
  name: string;
  type: string;
  level: number;
}

export class PokemonRepository {
  private pokemons: Pokemon[] = [
    { id: '1', name: 'Pikachu', type: 'Electric', level: 10 },
    { id: '2', name: 'Charmander', type: 'Fire', level: 12 },
    { id: '3', name: 'Bulbasaur', type: 'Grass', level: 11 },
  ];

  async findAll(filters: {
    name?: string;
    limit?: number;
    offset?: number;
  }): Promise<Pokemon[]> {
    let result = [...this.pokemons];

    if (filters.name) {
      const query = filters.name.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(query));
    }

    const offset = filters.offset || 0;
    const limit = filters.limit ? filters.limit : result.length;

    return result.slice(offset, offset + limit);
  }

  async findById(id: string): Promise<Pokemon | null> {
    return this.pokemons.find((p) => p.id === id) || null;
  }

  async findByName(name: string): Promise<Pokemon | null> {
    return (
      this.pokemons.find((p) => p.name.toLowerCase() === name.toLowerCase()) ||
      null
    );
  }

  async create(data: {
    name: string;
    type: string;
    level: number;
  }): Promise<Pokemon> {
    const newPokemon: Pokemon = {
      id: Date.now().toString(),
      ...data,
    };
    this.pokemons.push(newPokemon);
    return newPokemon;
  }

  async delete(id: string): Promise<boolean> {
    const index = this.pokemons.findIndex((p) => p.id === id);
    if (index === -1) return false;
    this.pokemons.splice(index, 1);
    return true;
  }
}
