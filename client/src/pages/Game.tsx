import "./styles/game.scss";

import { Routes } from "types.d";
import { Table } from "features/table/index";
import { UI, SoundButton, BackButton } from "features/interface/index";

export default function Game() {
  return (
    <div className="Game">
      <Table />
      <UI />
      <BackButton route={Routes.MENU} />
      <SoundButton />
    </div>
  );
}
