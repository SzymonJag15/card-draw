const API_URL = "https://pokeapi.co/api/v2";
const POKE_LIMIT = "20";

const getPokemon = async ({ url }) => {
  const response = await fetch(url);
  const pokemon = await response.json();

  return pokemon;
};

const getCards = async () => {
  const cards = [];

  const response = await fetch(`${API_URL}/pokemon?limit=${POKE_LIMIT}`);
  const { results } = await response.json();

  results.map(async (pokemon) => {
    const pokemonData = await getPokemon(pokemon);
    cards.push(pokemonData);
  });

  return cards;
};

getCards();
