import "./UI.style.css";
import "./buttons/buttons.style.css";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useAppSelector } from "hooks/hooks";
import Chip from "components/interface/chip/Chip";
import HitButton from "components/interface/buttons/HitButton";
import SplitButton from "components/interface/buttons/SplitButton";
import DoubleDownButton from "./buttons/DoubleDownButton";
import StandButton from "./buttons/StandButton";
import DealButton from "./buttons/DealButton";
import ClearButton from "./buttons/ClearButton";
import InfoTable from "./infoTable/InfoTable";
import NewBetButton from "./buttons/NewBetButton";
import RebetButton from "./buttons/rebetButton";

import { ChipValue } from "./chip/Chip"; // Enum for Chip component props

export default function UI() {
  const inGame: boolean = useAppSelector((state) => state.table.inGame);
  const gameFinished = useAppSelector((state) => state.table.gameFinished);
  const popUpActive = useAppSelector((state) => state.table.popUpActive);
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

  return (
    <nav className={`interface ${isDisabled ? "interface-disabled" : ""}`}>
      <section className="interface--chips margin-right interface--background">
        <Chip value={ChipValue.chipOne} />
        <Chip value={ChipValue.chipTen} />
        <Chip value={ChipValue.chipTwentyFive} />
        <Chip value={ChipValue.chipFifty} />
        <Chip value={ChipValue.chipHundred} />
        <Chip value={ChipValue.chipFiveHundred} />
      </section>
      <section className="interface--main interface--background" ref={parent}>
        {mainInterfaceJSX}
      </section>
      <section className="interface--table margin-left interface--background">
        <InfoTable />
      </section>
    </nav>
  );
}
