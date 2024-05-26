// src/components/leftPannel/LeftPannel.jsx
import "./styles/leftPannel.scss";

export default function LeftPannel() {
  return (
    <div className="pannel">
      <div className="pannel__header">Pokedex</div>
      <ul className="pannel__list">
        <li>NO. 1 BULBASAUR</li>
        <li>NO. 2 IVYSAUR</li>
        <li>NO. 3 VENUSAUR</li>
        <li>NO. 4 CHARMANDER</li>
        <li>NO. 5 CHARMELEON</li>
      </ul>
      <div className="pannel__controls">
        <button>
          <img src="icons/caret-down-solid.svg" alt="" />
        </button>
        <button>
          <img src="icons/caret-down-solid.svg" alt="" />
        </button>
        <form action="#">
          <input type="text" id="name" placeholder="Pokemon Name" />
          <button type="submit">
            <img src="icons/magnifying-glass-solid.svg" alt="" />
          </button>
        </form>
      </div>
    </div>
  );
}
