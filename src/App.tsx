import { useMemo, useState } from "react";
import "./App.css";
import { createField } from "./services/createField";
import { Cover, Field, Tiles } from "./ui/Field";
import { Header, Smile } from "./ui/Header";


function App() {
  const [lose, setLose] = useState<boolean>(false);
  const size = 16;
  const minesAmount = 40;
  const [field] = useState<Array<Tiles>>(() => createField(size, minesAmount));
  const [mines, setMines] = useState<number>(minesAmount);
  const [cover, setCover] = useState<Array<Cover>>(() => new Array(size * size).fill(Cover.Hidden));
  const [smile, setSmile] = useState<Smile>(Smile.DEFAULT);
  const win = useMemo(
    () =>
      !field.some(
        (tile, i) =>
          tile === Tiles.BOMB && cover[i] !== Cover.Flag && cover[i] !== Cover.Transparent
      ),
    [cover, field]
  );

  return (
    <div className="App">
      <div className="game">
        <Header minesAmount={mines} setMinesAmount={setMines} win={win} lose={lose} smile={smile} setSmile={setSmile}/>
        <Field setSmile={setSmile} cover={cover} field={field} setLose={setLose} setCover={setCover} size={size} />
      </div>
    </div>
  );
}

export default App;