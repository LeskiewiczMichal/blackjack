import "./Styles/UI.style.css";

import { RootState } from "../store/store";
import { useSelector } from "react-redux";

// Components
import Chip from "./Chip";
import HitButton from "./HitButton";
import SplitButton from "./Interface/SplitButton";
import DoubleDownButton from "./Interface/DoubleDownButton";
import StandButton from "./Interface/StandButton";
import DealButton from "./Interface/DealButton/DealButton";
import ClearButton from "./Interface/ClearButton";
import InfoTable from "./Interface/InfoTable";

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
