import "./game.css";
import { Table } from "features/table/index";
import { UI, SoundButton } from "features/interface/index";

export default function Game() {
  return (
    <div className="App">
      <Table />
      <UI />
      <SoundButton />
    </div>
  );
}
