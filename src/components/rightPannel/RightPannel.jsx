// src/components/rightPannel/RightPannel.jsx

import { useEffect, useState } from "react";
import PokeballView from "./PokeballView";
import PokemonView from "./PokemonView";
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

export default function RightPannel({
  selectedPokemon,
  pokemonList,
  setSelectedPokemon,
}) {
  if (selectedPokemon == "") {
    // No Pokemon selected
    return (
      <div className="right-pannel">
        <PokeballView message={"Select Pokemon"} />
      </div>
    );
  }

  const pokemon = (selectedPokemon != "" &&
    pokemonList.find((pokemon) => pokemon.name == selectedPokemon)) || {
    error: "Pokemon Not Found",
  };

  const [isLoaded, setIsLoaded] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [pokemonData, setPokemonData] = useState();

  useEffect(() => {
    if (pokemon.url) {
      setIsDataLoaded(false);
      const data = {};
      fetch(pokemon.url)
        .then((res) => res.json())
        .then((resJSON) => {
          data["name"] = resJSON.name;
          data["number"] = resJSON.id;
          data["types"] = resJSON.types.map((slot) => slot.type.name);
          data["sprite"] =
            resJSON.sprites.other.dream_world.front_default ||
            resJSON.sprites.front_default;
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

                .then((evolutions) => {
                  data["evolutions"] = [];
                  const baseURL = import.meta.env.VITE_API_BASE_URL;
                  evolutions.forEach((evolution) => {
                    const url = baseURL + `pokemon/${evolution}`;
                    fetch(url)
                      .then((res) => res.json())
                      .then((resJSON) => {
                        const name = resJSON.name;
                        const sprite =
                          resJSON.sprites.other.dream_world.front_default ||
                          resJSON.sprites.front_default;
                        data.evolutions.push({ name, sprite });
                      });
                  });
                })
                .finally(() => {
                  setPokemonData({ ...data });
                  setIsDataLoaded(true);
                })
                .catch(
                  () =>
                    (pokemon["error"] = "Faild to Load Pokemon Evolution Chain")
                );
            })
            .catch(() => (pokemon["error"] = "Faild to Load Pokemon Species"));
        })
        .catch(() => (pokemon["error"] = "Faild to Load Pokemon "));
    }
  }, [selectedPokemon]);

  useEffect(() => {
    setIsLoaded(false);
    setTimeout(() => {
      setIsLoaded(true);
    }, 2500);
  }, [isDataLoaded]);

  // Invalid Pokemon
  if (pokemon.error) {
    return (
      <div className="right-pannel">
        <PokeballView message={pokemon.error} error={true} />
      </div>
    );
  }

  if (!isLoaded) {
    // Loading Pokemon
    return (
      <div className="right-pannel">
        <PokeballView message={"Loading ..."} loading={true} />
      </div>
    );
  } else {
    // Loaded
    return (
      <div className="right-pannel">
        <PokemonView
          pokemon={pokemonData}
          setSelectedPokemon={setSelectedPokemon}
        />
      </div>
    );
  }
}
