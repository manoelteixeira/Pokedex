// src/components/rightPannel/PokemonViewEvolutions.jsx

export default function PokemonViewEvolutions({
  evolutions,
  setSelectedPokemon,
  currentPokemon,
}) {
  console.log(currentPokemon);
  if (evolutions.length == 1) {
    return (
      <div className="pokemon-view__evolutions">
        <div className="pokemon-view__evolutions-title">Evolutions</div>
        <div className="pokemon-view__evolutions-message">
          <span>{evolutions[0].name}</span> does not evolve!
        </div>
      </div>
    );
  }
  return (
    <div className="pokemon-view__evolutions">
      <div className="pokemon-view__evolutions-title">Evolutions</div>
      <div className="pokemon-view__evolutions-items">
        {evolutions.map((pokemon) => {
          return (
            <div
              key={crypto.randomUUID()}
              className="pokemon-view__evolutions-item"
              style={{ borderColor: pokemon.name == currentPokemon && "red" }}
              onClick={() => {
                setSelectedPokemon(pokemon.name);
              }}
            >
              <img src={pokemon.sprite} alt={pokemon.name} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
