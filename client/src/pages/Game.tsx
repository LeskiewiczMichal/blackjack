import "./styles/game.scss";
import { Table } from "features/table/index";
import { UI, SoundButton, BackButton } from "features/interface/index";

export default function Game() {
  return (
    <div className="Game">
      <Table />
      <UI />
      <BackButton />
      <SoundButton />
    </div>
  );
}
