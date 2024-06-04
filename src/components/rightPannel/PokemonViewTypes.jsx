// src/components/rightPannel/PokemonViewTypes.jsx

import "./styles/types.scss";

export default function PokemonViewTypes({ types }) {
  return (
    <div className="pokemon-view__types">
      <div className="pokemon-view__types-title">
        {types.length > 1 ? "Types" : "Type"}
      </div>
      <div className="pokemon-view__types-items">
        {types.map((type) => {
          return (
            <div
              key={crypto.randomUUID()}
              className={`pokemon-view__types-item type__${type}`}
            >
              {type}
            </div>
          );
        })}
      </div>
    </div>
  );
}
