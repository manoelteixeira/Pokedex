import { useEffect, useState } from "react";
import LeftPannel from "./components/leftPannel/LeftPannel";
import RightPannel from "./components/rightPannel/RightPannel";
import "./styles/App.scss";
import { useSearchParams } from "react-router-dom";

export default function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageNumber = Number(searchParams.get("page")) || 0;
  const pokemon = searchParams.get("pokemon") || "";

  const [offset, setOffset] = useState(pageNumber * 8);
  const [selectedPokemon, setSelectedPokemon] = useState(pokemon);

  useEffect(() => {
    const params = {};
    const page = offset / 8;
    if (page > 0) {
      params["page"] = page;
    }
    if (selectedPokemon != "") {
      params["pokemon"] = selectedPokemon;
    }

    setSearchParams({ ...params });
  }, [offset, selectedPokemon]);

  return (
    <div className="pokedex">
      <LeftPannel
        offset={offset}
        setOffset={setOffset}
        setSelectedPokemon={setSelectedPokemon}
      />
      <div className="pokedex__middle">
        <div className="pokedex__middle-line"></div>
        <div className="pokedex__middle-line"></div>
        <div className="pokedex__middle-line"></div>
      </div>
      <RightPannel
        selectedPokemon={selectedPokemon}
        setSelectedPokemon={setSelectedPokemon}
      />
    </div>
  );
}
