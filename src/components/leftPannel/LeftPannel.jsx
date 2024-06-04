// src/components/leftPannel/LeftPannel.jsx
import { useEffect, useState } from "react";
import PokemonListView from "./PokemonListView";

import "./styles/leftPannel.scss";

export default function LeftPannel({
  page,
  setPage,
  pokemonList,
  setSelectedPokemon,
}) {
  const [pokemonView, setPokemonView] = useState([]);
  const [search, setSearch] = useState("");
  const [searchList, setSearchList] = useState([]);

  const offset = 7;

  useEffect(() => {
    if (search == "") {
      const startIdx = (page - 1) * offset;
      const endIdx = startIdx + offset;
      setPokemonView(pokemonList.slice(startIdx, endIdx));
    } else {
      setPokemonView(searchList.slice(0, offset));
    }
  }, [page, searchList]);

  useEffect(() => {
    if (search != "") {
      const list = pokemonList.filter(
        (pokemon) => pokemon.name.slice(0, search.length) == search
      );

      setSearchList([...list]);
    } else {
      setSearchList([]);
    }
  }, [search]);

  const pageUp = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const pageDown = () => {
    setPage(page + 1);
  };

  const handleSearchChange = (event) => {
    const field = event.target.value;
    setSearch(field);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSelectedPokemon(search);
  };

  return (
    <div className="left-pannel">
      {/* Title */}
      <div className="left-pannel__title">Pokedex</div>
      {/* Pokemon List */}
      <div className="left-pannel__list">
        <PokemonListView
          pokemonList={pokemonView}
          setSelectedPokemon={setSelectedPokemon}
        />
      </div>
      {/* Controls */}
      <div className="left-pannel__controls">
        {/* Controls - Page Up/Down */}
        <button onClick={pageUp}>
          <img src="./icons/caret-up-solid.svg" alt="up" />
        </button>
        <button onClick={pageDown}>
          <img src="./icons/caret-down-solid.svg" alt="down" />
        </button>
        {/* Controls - Search */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="name"
            placeholder="Pokemon Name"
            onChange={handleSearchChange}
          />
          <button type="submit">
            <img src="./icons/magnifying-glass-solid.svg" alt="" />
          </button>
        </form>
      </div>
    </div>
  );
}
