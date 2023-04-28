import "./styles/menu.scss";

import { Routes } from "types.d";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "hooks/hooks";
import { logoutUser } from "features/authentication";
import { goBancrupt } from "features/skins/index";
import Button, { ButtonColors, ButtonTypes } from "components/Button";

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
      <Button
        text="Start Game"
        color={ButtonColors.GREEN}
        onClick={() => navigate(Routes.GAME)}
        type={ButtonTypes.BUTTON}
      />
      <Button
        text="Profile"
        color={ButtonColors.GREEN}
        type={ButtonTypes.BUTTON}
        onClick={() => navigate(Routes.PROFILE)}
      />
      <Button
        text="Shop"
        color={ButtonColors.GREEN}
        type={ButtonTypes.BUTTON}
        onClick={() => navigate(Routes.SHOP)}
      />
      {user ? (
        <Button
          text="Sign out"
          color={ButtonColors.GREEN}
          onClick={async () => {
            await dispatch(logoutUser());
          }}
          type={ButtonTypes.BUTTON}
        />
      ) : (
        <Button
          text="Sign in"
          color={ButtonColors.GREEN}
          type={ButtonTypes.BUTTON}
          onClick={() => navigate(Routes.LOGIN)}
        />
      )}
      {goBankruptActive && (
        <Button
          text="Go Bankrupt"
          color={ButtonColors.RED}
          type={ButtonTypes.BUTTON}
          onClick={async () => {
            await dispatch(goBancrupt());
          }}
        />
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
