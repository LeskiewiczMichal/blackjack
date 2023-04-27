import "./styles/menu.scss";

import { Routes, SkinNames } from "types.d";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "hooks/hooks";
import { logoutUser } from "features/authentication";
import { goBancrupt } from "features/skins/index";
import {
  CARDS_DEFAULT,
  CARDS_DARK,
  CARDS_NEON,
  CHIPS_DEFAULT,
  CHIPS_DARK,
  CHIPS_NEON,
  CONSTANTS,
} from "assets/preloadLinks";
import { useEffect } from "react";

export default function Menu() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const balance = useAppSelector((state) => state.player.balance);
  const cardsSkin = useAppSelector((state) => state.skins.cards);
  const chipsSkin = useAppSelector((state) => state.skins.chips);

  const goBankruptActive = user && balance === 0;

  // Preload images
  useEffect(() => {
    CONSTANTS.forEach((constant) => {
      const img = new Image();
      img.src = constant;
    });

    if (!cardsSkin) {
      CARDS_DEFAULT.forEach((card) => {
        const img = new Image();
        img.src = card;
      });
    } else if (cardsSkin.name === SkinNames.DARK) {
      CARDS_DARK.forEach((card) => {
        const img = new Image();
        img.src = card;
      });
    } else if (cardsSkin.name === SkinNames.NEON) {
      CARDS_NEON.forEach((card) => {
        const img = new Image();
        img.src = card;
      });
    }

    if (!chipsSkin) {
      CHIPS_DEFAULT.forEach((chip) => {
        const img = new Image();
        img.src = chip;
      });
    } else if (chipsSkin.name === SkinNames.DARK) {
      CHIPS_DARK.forEach((chip) => {
        const img = new Image();
        img.src = chip;
      });
    } else if (chipsSkin.name === SkinNames.NEON) {
      CHIPS_NEON.forEach((chip) => {
        const img = new Image();
        img.src = chip;
      });
    }
  }, [cardsSkin, chipsSkin]);

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
