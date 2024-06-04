// src/App.jsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import LeftPannel from "./components/leftPannel/LeftPannel";
import RightPannel from "./components/rightPannel/RightPannel";
import "./styles/App.scss";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [pokemonList, setPokemonList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [selectedPokemon, setSelectedPokemon] = useState(
    searchParams.get("pokemon") || ""
  );

  useEffect(() => {
    setIsLoaded(false);
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    const url = baseURL + `pokemon?limit=100000&`;
    fetch(url)
      .then((res) => res.json())
      .then((resJSON) => resJSON.results)
      .then((data) => {
        setPokemonList([...data]);
        setIsLoaded(true);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const params = {};
    if (page > 1) {
      params["page"] = page;
    }
    if (selectedPokemon != "") {
      params["pokemon"] = selectedPokemon;
    }
    setSearchParams({ ...params });
  }, [selectedPokemon, page]);

  if (isLoaded) {
    return (
      <>
        <div className="pokedex">
          <div className="pokedex__pannel">
            <LeftPannel
              page={page}
              setPage={setPage}
              pokemonList={pokemonList}
              setSelectedPokemon={setSelectedPokemon}
            />
          </div>
          <div className="pokedex__middle">
            <div className="pokedex__middle-line"></div>
            <div className="pokedex__middle-line"></div>
            <div className="pokedex__middle-line"></div>
          </div>
          <div className="pokedex__pannel">
            <RightPannel
              pokemonList={pokemonList}
              selectedPokemon={selectedPokemon}
              setSelectedPokemon={setSelectedPokemon}
            />
          </div>
        </div>
      </>
    );
  }
}

export default App;
