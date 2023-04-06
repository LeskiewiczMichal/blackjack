import "./Styles/UI.style.css";

import { RootState } from "../store/store";
import { useSelector } from "react-redux";

// Components
import Chip from "./Chip";
import HitButton from "Components/Interface/HitButton/HitButton";
import SplitButton from "Components/Interface/SplitButton";
import DoubleDownButton from "Components/Interface/DoubleDownButton";
import StandButton from "Components/Interface/StandButton";
import DealButton from "Components/Interface/DealButton/DealButton";
import ClearButton from "Components/Interface/ClearButton";
import InfoTable from "Components/Interface/InfoTable";

// Enum for chip props
import { ChipValue } from "./Chip";

export default function UI() {
  const table: boolean = useSelector((state: RootState) => state.table.inGame);

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
        {table ? 
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
            }
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
