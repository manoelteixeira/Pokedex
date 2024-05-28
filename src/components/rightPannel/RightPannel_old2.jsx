// src/components/rightPannel/RightPannel.jsx

import { useEffect, useState } from "react";
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

export default function RightPannel({ selectedPokemon }) {
  const [pokemonData, setPokemonData] = useState();

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

  // Load Pokemon
  useEffect(() => {
    if (selectedPokemon != "") {
      setLoaded(false);
      const data = {};
      const POKEMON_URL = `https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`;
      fetch(POKEMON_URL) // Get General Pokemon Data
        .then((response) => {
          if (response.status !== 200) {
            return null;
          } else {
            return response.json();
          }
        })
        .then((resJSON) => {
          data["id"] = resJSON.id;
          data["order"] = resJSON.order;
          data["name"] = resJSON.name;
          data["sprite"] = resJSON.sprites.other.dream_world.front_default;

          return resJSON.species.url;
        })
        .then((speciesURL) => {
          // Get Evolution Data
          fetch(speciesURL)
            .then((res) => res.json())
            .then((resJSON) => {
              const evolutionUrl = resJSON.evolution_chain.url;
              fetch(evolutionUrl)
                .then((res) => res.json())
                .then((resJSON) => getEvolutionChain(resJSON.chain))
                .then((evolutions) => {
                  data["evolutions"] = [];
                  // console.log(evolutions);
                  if (evolutions.length > 0) {
                    evolutions.forEach((item) => {
                      const item_url = `https://pokeapi.co/api/v2/pokemon/${item}`;
                      fetch(item_url)
                        .then((res) => res.json())
                        .then((resJSON) => {
                          const evolution = {};
                          evolution.name = resJSON.name;
                          evolution.sprite =
                            resJSON.sprites.other.dream_world.front_default;
                          data.evolutions.push(evolution);
                        });
                    });
                  }
                });
            });
          setPokemonData(data);
          setLoaded(true);
          console.log(pokemonData);
        });
    }
  }, [selectedPokemon]);

  if (selectedPokemon == "") {
    return <div className="details">{noPokemon("Select a Pokemon")}</div>;
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
        {/* Evolutions */}
      </div>
    );
  }
}
