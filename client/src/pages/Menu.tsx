import "./styles/menu.scss";

import { useNavigate, Navigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "hooks/hooks";
import { logoutUser } from "features/authentication";

export default function Menu() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);

  if (!user) {
    return <Navigate to="/" />;
  }

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
      <button
        type="button"
        onClick={async () => {
          await dispatch(logoutUser());
        }}
      >
        Logout
      </button>
    </main>
  );
}
