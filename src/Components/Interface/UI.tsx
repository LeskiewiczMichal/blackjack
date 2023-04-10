import "./UI.style.css";
import "./Buttons/buttons.style.css";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useAppSelector } from "Hooks/hooks";
import Chip from "Components/Interface/Chip/Chip";
import HitButton from "Components/Interface/Buttons/HitButton";
import SplitButton from "Components/Interface/Buttons/SplitButton";
import DoubleDownButton from "Components/Interface/Buttons/DoubleDownButton";
import StandButton from "Components/Interface/Buttons/StandButton";
import DealButton from "Components/Interface/Buttons/DealButton";
import ClearButton from "Components/Interface/Buttons/ClearButton";
import InfoTable from "Components/Interface/InfoTable/InfoTable";
import NewBetButton from "Components/Interface/Buttons/NewBetButton";
import RebetButton from "./Buttons/rebetButton";

import { ChipValue } from "./Chip/Chip"; // Enum for Chip component props

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
