export default function PokemonViewHeader({ sprite, name, number }) {
  return (
    <div className="pokemon-view__header">
      <div className="pokemon-view__header-image">
        <img src={sprite} alt={name} />
      </div>
      <div className="pokemon-view__header-name">{name}</div>
      <div className="pokemon-view__header-number">No. {number}</div>
    </div>
  );
}
