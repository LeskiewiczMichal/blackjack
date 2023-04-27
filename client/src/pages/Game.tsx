import "./styles/game.scss";

import { Routes } from "types.d";
import { Table } from "features/table/index";
import { UI, SoundButton, BackButton } from "features/interface/index";
import { useEffect, useState } from "react";
import {
  CARDS_DEFAULT,
  CARDS_DARK,
  CARDS_NEON,
  CONSTANTS,
} from "assets/preloadLinks";
import LoadingScreen from "./LoadingScreen";

export default function Game() {
  const [isLoaded, setIsLoaded] = useState(false);

  // Preload images
  useEffect(() => {
    CONSTANTS.forEach((constant) => {
      const img = new Image();
      img.src = constant;
    });

    CARDS_DEFAULT.forEach((card) => {
      const img = new Image();
      img.src = card;
    });

    CARDS_DARK.forEach((card) => {
      const img = new Image();
      img.src = card;
    });

    CARDS_NEON.forEach((card) => {
      const img = new Image();
      img.src = card;
    });

    setIsLoaded(true);
  }, []);

  return isLoaded ? (
    <div className="Game">
      <Table />
      <UI />
      <BackButton route={Routes.MENU} />
      <SoundButton />
    </div>
  ) : (
    <LoadingScreen />
  );
}
