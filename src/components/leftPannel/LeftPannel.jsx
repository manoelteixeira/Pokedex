// src/components/leftPannel/LeftPannel.jsx
import { useEffect, useState } from "react";
import "./styles/leftPannel.scss";

export default function LeftPannel({ offset, setOffset, setSelectedPokemon }) {
  const [pokemonList, setPokemonList] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  function incrementOffset() {
    setIsLoaded(false);
    setOffset(offset + 8);
  }

  function decrementOffset() {
    if (offset > 0) {
      setIsLoaded(false);
      setOffset(offset - 8);
    }
  }

  function selectPokemon(event) {
    const pokemon = event.target.innerText.toLowerCase();
    setSelectedPokemon(pokemon);
  }

  function handleForm(event) {
    event.preventDefault();
    setSelectedPokemon(event.target.name.value);
    event.target.name.value = "";
  }

  useEffect(() => {
    const API_URL = `https://pokeapi.co/api/v2/pokemon?limit=8&offset=${offset}`;

    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setPokemonList([...data.results]);
        setIsLoaded(true);
      });
  }, [offset]);

  return (
    <div className="pannel">
      <div className="pannel__header">Pokedex</div>
      <ul className="pannel__list">
        {isLoaded &&
          pokemonList.map((pokemon) => {
            return (
              <li key={crypto.randomUUID()} onClick={selectPokemon}>
                {pokemon.name.toUpperCase()}
              </li>
            );
          })}
      </ul>
      <div className="pannel__controls">
        <button onClick={decrementOffset}>
          <img src="icons/caret-up-solid.svg" alt="" />
        </button>
        <button onClick={incrementOffset}>
          <img src="icons/caret-down-solid.svg" alt="" />
        </button>
        <form action="#" onSubmit={handleForm}>
          <input type="text" id="name" placeholder="Pokemon Name or Number" />
          <button type="submit">
            <img src="icons/magnifying-glass-solid.svg" alt="" />
          </button>
        </form>
      </div>
    </div>
  );
}
