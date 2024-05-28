// src/components/evolution/Evolution.jsx

import { useEffect, useState } from "react";
import "./style/evolution.scss";

export default function Evolution({ pokemon, setSelectedPokemon }) {
  const [evolutionData, setEvolutionData] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const API_URL = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    setIsLoaded(false);
    fetch(API_URL)
      .then((res) => res.json())
      .then((resJSON) => {
        const name = resJSON.name;
        const sprite = resJSON.sprites.other.dream_world.front_default;
        return { name, sprite };
      })
      .then((data) => {
        setEvolutionData(data);
        setIsLoaded(true);
      });
  }, []);

  if (!isLoaded) {
    return <div className="evolution">Loading</div>;
  } else {
    return (
      <div
        className="evolution"
        onClick={() => setSelectedPokemon(evolutionData.name)}
      >
        <img
          src={evolutionData.sprite}
          alt={evolutionData.name}
          className="evolution__image"
        />
        <div className="evolution__name">{evolutionData.name}</div>
      </div>
    );
  }
}
