import "./app.style.css";

import Table from "components/table/Table";
import UI from "components/interface/UI";
import SoundButton from "components/interface/soundbutton/SoundButton";

function App() {
  return (
    <div className="App">
      <Table />
      <UI />
      <SoundButton />
    </div>
  );
}

export default App;
