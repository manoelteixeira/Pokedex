// src/components/rightPannel/PokeballView.jsx

import "./styles/pokeballView.scss";

export default function PokeballView({
  message,
  error = false,
  loading = false,
}) {
  if (loading) {
    return (
      <div className="pokeball-view">
        <div className="pokeball-view__pokeball loading"></div>
        <div className={`pokeball-view__message${error && "-error"}`}>
          {message}
        </div>
      </div>
    );
  }
  return (
    <div className="pokeball-view">
      <div className="pokeball-view__pokeball"></div>
      <div className={`pokeball-view__message${error && "-error"}`}>
        {message}
      </div>
    </div>
  );
}
