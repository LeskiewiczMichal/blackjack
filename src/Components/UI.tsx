import "./Styles/UI.style.css";
import Chip from "./Chip";
import HitButton from "./HitButton";
import SplitButton from "./Interface/SplitButton";
import DoubleDownButton from "./Interface/DoubleDownButton";
import StandButton from "./Interface/StandButton";
import DealButton from "./Interface/DealButton";
import ClearButton from "./Interface/ClearButton";

import { ChipValue } from "./Chip";

export default function UI() {
  return (
    <nav className="interface">
      <section className="interface--chips margin-right">
        <Chip value={ChipValue.chipOne} />
        <Chip value={ChipValue.chipTen} />
        <Chip value={ChipValue.chipTwentyFive} />
      </section>
      <section className="interface--main">
        <HitButton />
        <SplitButton />
        <DoubleDownButton />
        <StandButton />
        <DealButton />
        <ClearButton />
      </section>
      <section className="interface--chips margin-left">
        <Chip value={ChipValue.chipFifty} />
        <Chip value={ChipValue.chipHundred} />
        <Chip value={ChipValue.chipFiveHundred} />
      </section>
    </nav>
  );
}
