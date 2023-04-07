import "Components/Styles/UI.style.css";
// Hooks
import { useAppSelector } from "Hooks/hooks";
// Components
import Chip from "Components/Interface/Chip";
import HitButton from "Components/Interface/Buttons/HitButton";
import SplitButton from "Components/Interface/Buttons/SplitButton";
import DoubleDownButton from "Components/Interface/Buttons/DoubleDownButton";
import StandButton from "Components/Interface/Buttons/StandButton";
import DealButton from "Components/Interface/Buttons/DealButton";
import ClearButton from "Components/Interface/Buttons/ClearButton";
import InfoTable from "Components/Interface/InfoTable";
import NewBetButton from "Components/Interface/Buttons/NewBetButton";

import { ChipValue } from "./Chip";  // Enum for Chip component props


export default function UI() {
  const inGame: boolean = useAppSelector((state) => state.table.inGame);
  const gameFinished = useAppSelector((state) => state.table.gameFinished);

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
    <nav className="interface">
      <section className="interface--chips margin-right interface--background">
        <Chip value={ChipValue.chipOne} />
        <Chip value={ChipValue.chipTen} />
        <Chip value={ChipValue.chipTwentyFive} />
        <Chip value={ChipValue.chipFifty} />
        <Chip value={ChipValue.chipHundred} />
        <Chip value={ChipValue.chipFiveHundred} />
      </section>
      <section className="interface--main interface--background">
        {mainInterfaceJSX}
      </section>
      <section className="interface--table margin-left interface--background">
        <InfoTable />
      </section>
    </nav>
  );
}
