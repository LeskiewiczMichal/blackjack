import "./menu.scss";

import { useNavigate } from "react-router-dom";

export default function Menu() {
  const navigate = useNavigate();

  return (
    <main className="menu--content">
      <h1>Blackjack menu</h1>
      <button type="button" onClick={() => navigate("/game")}>
        Start Game
      </button>
      <button type="button" onClick={() => navigate("/profile")}>
        Profile
      </button>
      <button type="button" onClick={() => navigate("/shop")}>
        Shop
      </button>
    </main>
  );
}
