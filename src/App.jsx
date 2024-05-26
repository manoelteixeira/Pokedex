import LeftPannel from "./components/leftPannel/LeftPannel";
import "./styles/App.scss";

export default function App() {
  return (
    <div className="pokedex">
      <div className="pokedex__pannel">
        <LeftPannel />
      </div>
      <div className="pokedex__middle">
        <div className="pokedex__middle-line"></div>
        <div className="pokedex__middle-line"></div>
        <div className="pokedex__middle-line"></div>
      </div>
      <div className="pokedex__pannel">Right</div>
    </div>
  );
}
