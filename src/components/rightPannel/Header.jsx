export default function Header({ pokemonData }) {
  return (
    <div className="details__header">
      <div className="details__header-image">
        <img src={pokemonData.sprite} alt={pokemonData.name} />
      </div>
      <div className="details__header-name">{pokemonData.name}</div>
      <div className="details__header-number">No. {pokemonData.id}</div>
    </div>
  );
}
