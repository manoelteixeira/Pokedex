// src/components/rightPannel/RightPannel.jsx

import { useEffect, useState } from "react";
import Evolution from "../evolution/Evolution";
import "./styles/rightPannel.scss";

function getEvolutionChain(chain) {
  const evlutions = [chain.species.name];
  let obj = chain.evolves_to[0];

  while (obj) {
    if (obj.species) {
      evlutions.push(obj.species.name);
    }
    obj = obj.evolves_to[0];
  }
  return evlutions;
}

export default function RightPannel({ selectedPokemon, setSelectedPokemon }) {
  const [pokemonData, setPokemonData] = useState();
  const [evolutionDiv, setEvolutionDiv] = useState([]);

  const [loaded, setLoaded] = useState(false);

  function noPokemon(message, error = false) {
    return (
      <div className="noPokemon">
        <div className="noPokemon__pokeball"></div>
        <div className={`noPokemon__message`} style={{ color: error && "red" }}>
          {message}
        </div>
      </div>
    );
  }

  useEffect(() => {
    if (selectedPokemon != "") {
      const pokemon = {};
      const API_URL = `https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`;
      fetch(API_URL) // Basic Pokemon Data
        .then((res) => res.json())
        .then((resJSON) => {
          pokemon["id"] = resJSON.id;
          pokemon["order"] = resJSON.order;
          pokemon["name"] = resJSON.name;
          pokemon["types"] = resJSON.types.map((slot) => slot.type.name);
          pokemon["sprite"] =
            resJSON.sprites.other.dream_world.front_default ||
            resJSON.sprites.front_default;
          // pokemon["sprite"] = resJSON.sprites.front_default;
          return resJSON.species.url;
        })
        .then((speciesURL) => {
          fetch(speciesURL)
            .then((res) => res.json())
            .then((resJSON) => resJSON.evolution_chain.url)
            .then((chainURL) => {
              fetch(chainURL)
                .then((res) => res.json())
                .then((resJSON) => resJSON.chain)
                .then((chain) => getEvolutionChain(chain))
                .then((evolutions) => (pokemon["evolutions"] = evolutions))
                .finally(() => {
                  setPokemonData(pokemon);
                  setLoaded(true);
                });
            });
        })
        .catch(() => setSelectedPokemon("invalid"));
    }
  }, [selectedPokemon]);

  useEffect(() => {
    if (pokemonData) {
      setEvolutionDiv(
        pokemonData.evolutions.map((pokemon) => {
          return (
            <Evolution
              key={crypto.randomUUID()}
              pokemon={pokemon}
              setSelectedPokemon={setSelectedPokemon}
              selectedPokemon={selectedPokemon}
            />
          );
        })
      );
    }
  }, [pokemonData]);

  if (selectedPokemon == "") {
    return <div className="details">{noPokemon("Select a Pokemon")}</div>;
  } else if (selectedPokemon == "invalid") {
    return <div className="details">{noPokemon("Invaild Pokemon", true)}</div>;
  } else if (!loaded) {
    return <div className="details">{noPokemon("Loading ...")}</div>;
  } else if (!pokemonData) {
    return (
      <div className="details">{noPokemon("Pokemon Not Found !!!", true)}</div>
    );
  } else {
    return (
      <div className="details">
        {/* Header */}
        <div className="details__header">
          <div className="details__header-image">
            <img src={pokemonData.sprite} alt={pokemonData.name} />
          </div>
          <div className="details__header-name">{pokemonData.name}</div>
          <div className="details__header-number">No. {pokemonData.order}</div>
        </div>
        {/* Types */}
        <div className="details__type">
          <div className="details__type-title">Type</div>
          <div className="details__type-items">
            {pokemonData.types.map((type) => {
              return (
                <div
                  key={crypto.randomUUID()}
                  className={`details__type-item ${type}`}
                >
                  {type}
                </div>
              );
            })}
          </div>
        </div>
        {/* Evolutions */}
        {pokemonData.evolutions.length > 1 && (
          <div className="details__evolutions">
            <div className="details__evolutions-title">Evolutions</div>
            {evolutionDiv}
          </div>
        )}
      </div>
    );
  }
}
