import "./UI.css";
import "./buttons/buttons.style.css";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useAppSelector } from "hooks/hooks";
import Chip from "features/interface/components/Chip";
import HitButton from "./buttons/HitButton";
import SplitButton from "./buttons/SplitButton";
import DoubleDownButton from "./buttons/DoubleDownButton";
import StandButton from "./buttons/StandButton";
import DealButton from "./buttons/DealButton";
import ClearButton from "./buttons/ClearButton";
import InfoTable from "./InfoTable";
import NewBetButton from "./buttons/NewBetButton";
import RebetButton from "./buttons/RebetButton";

import { ChipValue } from "./Chip"; // Enum for Chip component props

export default function UI() {
  const inGame: boolean = useAppSelector((state) => state.table.inGame);
  const gameFinished = useAppSelector((state) => state.table.gameFinished);
  const popUpActive = useAppSelector((state) => state.table.popUpActive);
  const skin = useAppSelector((state) => state.skins.interfaceBackground);

  const [parent] = useAutoAnimate();

  const isDisabled = popUpActive;

  // Check what buttons to render based on the state of the game
  let mainInterfaceJSX: JSX.Element;
  if (inGame) {
    if (!gameFinished) {
      mainInterfaceJSX = (
        <>
          <SplitButton />
          <StandButton />
          <HitButton />
          <DoubleDownButton />
        </>
      );
    } else {
      mainInterfaceJSX = (
        <>
          <NewBetButton />
          <RebetButton />
        </>
      );
    }
  } else {
    mainInterfaceJSX = (
      <>
        <DealButton />
        <ClearButton />
      </>
    );
  }

  let skinClass = "--Default";
  if (skin) {
    skinClass = `--${skin.name}`;
  }

  return (
    <nav className={`interface ${isDisabled ? "interface-disabled" : ""}`}>
      <section
        className={`interface--chips margin-right interface--background${skinClass}`}
      >
        <Chip value={ChipValue.chipOne} />
        <Chip value={ChipValue.chipTen} />
        <Chip value={ChipValue.chipTwentyFive} />
        <Chip value={ChipValue.chipFifty} />
        <Chip value={ChipValue.chipHundred} />
        <Chip value={ChipValue.chipFiveHundred} />
      </section>
      <section
        className={`interface--main interface--background${skinClass}`}
        ref={parent}
      >
        {mainInterfaceJSX}
      </section>
      <section
        className={`interface--table margin-left interface--background${skinClass}`}
      >
        <InfoTable />
      </section>
    </nav>
  );
}
