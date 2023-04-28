import "./styles/game.scss";

import { Routes, SkinNames } from "types.d";
import { Table } from "features/table/index";
import { UI, SoundButton, BackButton } from "features/interface/index";
import { useAppSelector } from "hooks/hooks";
import {
  CARDS_DEFAULT,
  CARDS_DARK,
  CARDS_NEON,
  CHIPS_DEFAULT,
  CHIPS_DARK,
  CHIPS_NEON,
  CONSTANTS,
} from "assets/preloadLinks";
import useImagePreloader from "hooks/useImagePreloader";
import LoadingScreen from "./LoadingScreen";

export default function Game() {
  const cardsSkin = useAppSelector((state) => state.skins.cards);
  const chipsSkin = useAppSelector((state) => state.skins.chips);

  let toPreload = [...CONSTANTS];

  if (!cardsSkin) {
    toPreload = [...toPreload, ...CARDS_DEFAULT];
  } else if (cardsSkin.name === SkinNames.DARK) {
    toPreload = [...toPreload, ...CARDS_DARK];
  } else if (cardsSkin.name === SkinNames.NEON) {
    toPreload = [...toPreload, ...CARDS_NEON];
  }

  if (!chipsSkin) {
    toPreload = [...toPreload, ...CHIPS_DEFAULT];
  } else if (chipsSkin.name === SkinNames.DARK) {
    toPreload = [...toPreload, ...CHIPS_DARK];
  } else if (chipsSkin.name === SkinNames.NEON) {
    toPreload = [...toPreload, ...CHIPS_NEON];
  }

  const { imagesPreloaded } = useImagePreloader(toPreload);

  return imagesPreloaded ? (
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
