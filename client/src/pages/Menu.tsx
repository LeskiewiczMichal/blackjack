import "./game.css";
import "./menu.css";

import { useNavigate } from "react-router-dom";

export default function Menu() {
  const navigate = useNavigate();

  return (
    <div className="App center">
      <main className="menu--content">
        <h1>Blackjack menu</h1>
        <button
          type="button"
          className="menu--content-button"
          onClick={() => navigate("/game")}
        >
          Start Game
        </button>
        <button
          type="button"
          className="menu--content-button"
          onClick={() => navigate("/shop")}
        >
          Shop
        </button>
      </main>
    </div>
  );
}
