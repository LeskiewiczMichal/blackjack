import "./styles/menu.scss";

import { Routes } from "types.d";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "hooks/hooks";
import { logoutUser } from "features/authentication";
import { goBancrupt } from "features/skins/index";

export default function Menu() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const balance = useAppSelector((state) => state.player.balance);

  const goBankruptActive = user && balance === 0;

  return (
    <main className="menu--content">
      <img src="" alt="" />
      <h1>Blackjack menu</h1>
      <button type="button" onClick={() => navigate(Routes.GAME)}>
        Start Game
      </button>
      <button type="button" onClick={() => navigate(Routes.PROFILE)}>
        Profile
      </button>
      <button type="button" onClick={() => navigate(Routes.SHOP)}>
        Shop
      </button>
      {user ? (
        <button
          type="button"
          onClick={async () => {
            await dispatch(logoutUser());
          }}
        >
          Sing out
        </button>
      ) : (
        <button type="button" onClick={() => navigate(Routes.LOGIN)}>
          Sign in
        </button>
      )}
      {goBankruptActive && (
        <button
          type="button"
          onClick={async () => {
            await dispatch(goBancrupt());
          }}
        >
          Go Bankrupt
        </button>
      )}
      {goBankruptActive && (
        <p>
          You don&apos;t have money. Going bankrupt means losing all your skins,
          but you receive 1000$
        </p>
      )}
    </main>
  );
}
