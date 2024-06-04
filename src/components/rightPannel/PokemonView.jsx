// src/components/rightPannel/PokemonView.jsx

import PokemonViewHeader from "./PokemonViewHeader";
import PokemonViewTypes from "./PokemonViewTypes";
import PokemonViewEvolutions from "./PokemonViewEvolutions";
import "./styles/pokemonView.scss";

export default function PokemonView({ pokemon, setSelectedPokemon }) {
  return (
    <div className="pokemon-view">
      <PokemonViewHeader
        sprite={pokemon.sprite}
        name={pokemon.name}
        number={pokemon.number}
      />
      <PokemonViewTypes types={pokemon.types} />
      <PokemonViewEvolutions
        evolutions={pokemon.evolutions}
        setSelectedPokemon={setSelectedPokemon}
        currentPokemon={pokemon.name}
      />
    </div>
  );
}
