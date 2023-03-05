import { ReactNode, useEffect, useState } from "react";
import { Timer } from "./Timer";

export interface HeaderProps {
  win: boolean;
  lose: boolean;
  smile: Smile;
  setSmile: React.Dispatch<React.SetStateAction<Smile>>;
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
  const { lose, win, smile, setSmile } = props;
  const [timer, setTimer] = useState<number>(40 * 60);
  const [stopwatch, setStopwatch] = useState<number>(0);
  const minutes = Math.ceil(timer / 60);

  const smileButtonClickHandler = () => {
    setSmile(Smile.DOWN);
  };

  const restartGameHandler = () => {
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((timer) => (timer >= 1 ? timer - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStopwatch((stopwatch) => (stopwatch <= 999 ? stopwatch + 1 : 0));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [stopwatch]);

  return (
    <div className="header">
      <div className="timer">
        <Timer time={minutes} />
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
