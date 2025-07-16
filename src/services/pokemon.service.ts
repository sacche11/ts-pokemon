import type { Pokemon } from "../types/pokemon.interface";
import { getRandomNumber } from "../utils/random-number";

const POKEMON_API_URL = "https://pokeapi.co/api/v2/pokemon";
const MAX_POKEMON_COUNT = 151;

export const getRandomPokemon = async (): Promise<Pokemon> => {
   const randomId = getRandomNumber(1, MAX_POKEMON_COUNT);
   const response = await fetch(`${POKEMON_API_URL}/${randomId}`);

   if (!response.ok) {
      throw new Error(`Error fetching Pokémon with ID ${randomId}`);
   }

   const data = await response.json();

   return {
      id: data.id,
      name: data.name,
      image: data.sprites.other["official-artwork"].front_default
   };
}

const normalizePokemonName = (name: string): string => {
   return name
      .toLowerCase()
      .trim()
      .normalize("NFD") // Normaliza a caracteres acentuados
      .replace(/[\u0300-\u036f]/g, "") // Remueve los acentos
      .replace(/[^a-z0-9]/g, "") // Elimina caracteres especiales
}

const isPokemonNameValid = (name: string, userInput: string): boolean => {
   const normalizedName = normalizePokemonName(name);
   const normalizedInput = normalizePokemonName(userInput);
   return normalizedName === normalizedInput;
}

export const pokemonService = {
   getRandomPokemon,
   isPokemonNameValid
}
