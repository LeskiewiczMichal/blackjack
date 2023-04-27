import "./styles/game.scss";

import { Routes } from "types.d";
import { Table } from "features/table/index";
import { UI, SoundButton, BackButton } from "features/interface/index";
// import { useEffect, useState } from "react";

export default function Game() {
  // const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="Game">
      <Table />
      <UI />
      <BackButton route={Routes.MENU} />
      <SoundButton />
    </div>
  );
}
