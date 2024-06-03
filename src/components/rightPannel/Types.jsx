export default function Types({ pokemonData }) {
  return (
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
  );
}
