import { ReactNode, useEffect, useState } from "react";
import { Timer } from "./Timer";

export interface HeaderProps {
  minesAmount: number;
  win: boolean;
  lose: boolean;
  smile: Smile;
  setSmile: React.Dispatch<React.SetStateAction<Smile>>;
  setMinesAmount: React.Dispatch<React.SetStateAction<number>>;
}

export enum Smile {
  DEFAULT,
  DOWN,
  SCARED,
  SAD,
  COOL,
}

const mapSmileToView: Record<Smile, ReactNode> = {
  [Smile.DEFAULT]: <img src="sprites/smile.png" alt="" />,
  [Smile.DOWN]: <img src="sprites/smile_down.png" alt="" />,
  [Smile.SCARED]: <img src="sprites/smile_O.png" alt="" />,
  [Smile.SAD]: <img src="sprites/smile_sad.png" alt="" />,
  [Smile.COOL]: <img src="sprites/smile_cool.png" alt="" />,
};

export const Header = (props: HeaderProps) => {
  const { lose, win, smile, setSmile, minesAmount } = props;
  const [stopwatch, setStopwatch] = useState<number>(0);
  const [counting, setCounting] = useState<boolean>(false);

  const smileButtonClickHandler = () => {
    setSmile(Smile.DOWN);
  };

  const restartGameHandler = () => {
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };

  useEffect(() => {
    setCounting(!win && !lose);
  }, [win, lose]);

  useEffect(() => {
    const interval = setInterval(() => {
      counting && setStopwatch((stopwatch) => (stopwatch <= 999 ? stopwatch + 1 : 0));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [stopwatch, counting]);

  return (
    <div className="header">
      <div className="mines-amount">
        <Timer time={minesAmount} />
      </div>
      <button
        className="smile-button"
        onMouseDown={smileButtonClickHandler}
        onMouseUp={restartGameHandler}
      >
        {mapSmileToView[lose ? Smile.SAD : win ? Smile.COOL : smile]}
      </button>
      <div className="stopwatch">
        <Timer time={stopwatch} />
      </div>
    </div>
  );
};
