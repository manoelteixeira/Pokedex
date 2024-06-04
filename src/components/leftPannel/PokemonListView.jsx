export default function PokemonListView({ pokemonList, setSelectedPokemon }) {
  if (pokemonList.length == 0) {
    return <li>Pokemon Not Found</li>;
  }
  return pokemonList.map((pokemon) => {
    return (
      <li
        key={crypto.randomUUID()}
        onClick={() => {
          setSelectedPokemon(pokemon.name);
        }}
      >
        {pokemon.name}
      </li>
    );
  });
}
