import { useMemo, useState } from "react";
import "./App.css";
import { Cover, createField, Field, Tiles } from "./ui/Field";

function App() {
  const [lose, setLose] = useState<boolean>(false);
  const size = 16;
  const minesAmount = 40;
  const [field] = useState<Array<Tiles>>(() => createField(size, minesAmount));
  const [cover, setCover] = useState<Array<Cover>>(() => new Array(size * size).fill(Cover.Hidden));
  const win = useMemo(
    () =>
      !field.some(
        (tile, i) =>
          tile === Tiles.BOMB && cover[i] !== Cover.Flag && cover[i] !== Cover.Transparent
      ),
    [cover, field]
  );

  if (lose) console.log("you lose");
  if (win) console.log("you win");

  return (
    <div className="App">
      <div className="game">
        <div className="header"></div>
        <Field cover={cover} field={field} setLose={setLose} setCover={setCover} size={size} />
      </div>
    </div>
  );
}

export default App;
