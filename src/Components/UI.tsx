import "./Styles/UI.style.css";

import { RootState } from "../store/store";
import { useAppSelector } from "Hooks/hooks";

// Components
import Chip from "./Chip";
import HitButton from "Components/Interface/HitButton/HitButton";
import SplitButton from "Components/Interface/SplitButton/SplitButton";
import DoubleDownButton from "Components/Interface/DoubleDownButton/DoubleDownButton";
import StandButton from "Components/Interface/StandButton/StandButton";
import DealButton from "Components/Interface/DealButton/DealButton";
import ClearButton from "Components/Interface/ClearButton";
import InfoTable from "Components/Interface/InfoTable";
import NewBetButton from "Components/Interface/NewBetButton/NewBetButton";

// Enum for chip props
import { ChipValue } from "./Chip";

export default function UI() {
  const inGame: boolean = useAppSelector((state) => state.table.inGame);
  const gameFinished = useAppSelector((state) => state.table.gameFinished);

  let mainInterfaceJSX: JSX.Element;
  if (inGame) {
    if (!gameFinished) {
      mainInterfaceJSX = (
        <section className="interface--main interface--background">
          <SplitButton />
          <DoubleDownButton />
          <StandButton />
          <HitButton />
        </section>
      );
    } else {
      mainInterfaceJSX = (
        <section className="interface--main interface--background">
          <NewBetButton />
        </section>
      );
    }
  } else {
    mainInterfaceJSX = (
      <section className="interface--main interface--background">
        <DealButton />
        <ClearButton />
      </section>
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
      {/* <section className="interface--main interface--background"> */}
      {mainInterfaceJSX}
      {/* {table ? 
              <section className="interface--main interface--background">
                <SplitButton />
                <DoubleDownButton />
                <StandButton />
                <HitButton />
              </section>
              :
              <section className="interface--main interface--background">
                <DealButton />
                <ClearButton />
              </section>
            } */}
      {/* <DealButton />
        <ClearButton />
        <SplitButton />
        <DoubleDownButton />
        <StandButton />
        <HitButton /> */}
      {/* </section> */}
      <section className="interface--table margin-left interface--background">
        <InfoTable />
      </section>
    </nav>
  );
}
