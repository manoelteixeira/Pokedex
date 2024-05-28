// src/components/rightPannel/RightPannel.jsx

import { useEffect, useState } from "react";
import "./styles/rightPannel.scss";

export default function RightPannel({ selectedPokemon }) {
  const [pokemon, setPokemon] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

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
      setIsLoaded(false);
      const API_URL = `https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`;
      fetch(API_URL)
        .then((response) => {
          if (response.status !== 200) {
            return null;
          } else {
            return response.json();
          }
        })
        .then((data) => {
          setPokemon(data);
          setIsLoaded(true);
        });
    }
  }, [selectedPokemon]);

  // Load Pokemon Data
  useEffect(() => {
    if (pokemon) {
      console.log("loading");
    }
  }, [pokemon]);

  if (selectedPokemon == "" || !isLoaded) {
    return <div className="details">{noPokemon("Select a Pokemon")}</div>;
  } else if (!pokemon) {
    return (
      <div className="details">{noPokemon("Pokemon Not Found !!!", true)}</div>
    );
  } else {
    return (
      <div className="details">
        {/* Header */}
        <div className="details__header">
          <div className="details__header-image">
            <img
              src={pokemon.sprites.other.dream_world.front_default}
              alt={pokemon.name}
            />
          </div>
          <div className="details__header-name">{pokemon.name}</div>
          <div className="details__header-number">No. {pokemon.order}</div>
        </div>
        {/* Evolutions */}
      </div>
    );
  }
}
