import { ReactNode, SyntheticEvent } from "react";
import { Tile } from "./Tiles";

export interface fieldProps {
  size: number;
  cover: Array<Cover>;
  field: Array<Tiles>;
  setCover: React.Dispatch<React.SetStateAction<Cover[]>>;
  setLose: React.Dispatch<React.SetStateAction<boolean>>;
}

export enum Cover {
  Transparent,
  Hidden,
  Flag,
  QuestionMark,
}

export enum Tiles {
  BOMB,
  DOWN,
  ONE,
  TWO,
  THREE,
  FOUR,
  FIVE,
  SIX,
  SEVEN,
  EIGHT,
}

const mapCoverToView: Record<Cover, ReactNode> = {
  [Cover.Transparent]: null,
  [Cover.Hidden]: <Tile skin="hidden" />,
  [Cover.Flag]: <Tile skin="flag" />,
  [Cover.QuestionMark]: <Tile skin="question" />,
};

const mapTileToView: Record<Tiles, ReactNode> = {
  [Tiles.BOMB]: <Tile skin="bomb" />,
  [Tiles.DOWN]: <Tile skin="down" />,
  [Tiles.ONE]: <Tile skin="digit_1" />,
  [Tiles.TWO]: <Tile skin="digit_2" />,
  [Tiles.THREE]: <Tile skin="digit_3" />,
  [Tiles.FOUR]: <Tile skin="digit_4" />,
  [Tiles.FIVE]: <Tile skin="digit_5" />,
  [Tiles.SIX]: <Tile skin="digit_6" />,
  [Tiles.SEVEN]: <Tile skin="digit_7" />,
  [Tiles.EIGHT]: <Tile skin="digit_8" />,
};

export function pos(x: number, y: number, size: number) {
  return y * size + x;
}

export function createField(size: number, minesAmount: number) {
  const field: Array<Tiles> = new Array(size * size).fill(Tiles.DOWN);

  function increment(x: number, y: number) {
    if (x >= 0 && x < size && y >= 0 && y < size) {
      if (field[pos(x, y, size)] === Tiles.BOMB) return;
      switch (field[pos(x, y, size)]) {
        case Tiles.ONE:
          field[pos(x, y, size)] = Tiles.TWO;
          break;

        case Tiles.TWO:
          field[pos(x, y, size)] = Tiles.THREE;
          break;

        case Tiles.THREE:
          field[pos(x, y, size)] = Tiles.FOUR;
          break;

        case Tiles.FOUR:
          field[pos(x, y, size)] = Tiles.FIVE;
          break;

        case Tiles.FIVE:
          field[pos(x, y, size)] = Tiles.SIX;
          break;

        case Tiles.SIX:
          field[pos(x, y, size)] = Tiles.SEVEN;
          break;

        case Tiles.SEVEN:
          field[pos(x, y, size)] = Tiles.EIGHT;
          break;

        default:
          field[pos(x, y, size)] = Tiles.ONE;
          break;
      }
    }
  }

  for (let i = 0; i < minesAmount; ) {
    const x = Math.floor(Math.random() * size);
    const y = Math.floor(Math.random() * size);

    if (field[pos(x, y, size)] === Tiles.BOMB) continue;
    field[pos(x, y, size)] = Tiles.BOMB;

    i++;

    increment(x + 1, y);
    increment(x - 1, y);
    increment(x, y + 1);
    increment(x, y - 1);
    increment(x + 1, y - 1);
    increment(x - 1, y - 1);
    increment(x + 1, y + 1);
    increment(x - 1, y + 1);
  }

  return field;
}

export const Field = (props: fieldProps) => {
  const { size, cover, field, setLose, setCover } = props;
  const dimension = new Array(size).fill(null);

  const onClickHandler = (x: number, y: number, inSize: number) => {
    function open(x: number, y: number) {
      if (x >= 0 && x < inSize && y >= 0 && y < inSize) {
        if (cover[pos(x, y, inSize)] === Cover.Transparent) return;

        opening.push([x, y]);
      }
    }

    if (cover[pos(x, y, inSize)] === Cover.Transparent) return;

    const opening: [number, number][] = [];

    open(x, y);

    while (opening.length) {
      const [x, y] = opening.pop()!;
      // Заносим изменение в стейт без тригера ререндера
      cover[pos(x, y, inSize)] = Cover.Transparent;
      if (field[pos(x, y, inSize)] !== Tiles.DOWN) continue;

      // В случае, когда клетка пустая, открываем соседние клетки
      open(x + 1, y);
      open(x - 1, y);
      open(x, y + 1);
      open(x, y - 1);
      open(x + 1, y - 1);
      open(x - 1, y - 1);
      open(x + 1, y + 1);
      open(x - 1, y + 1);
    }

    // Если клетка с миной
    if (field[pos(x, y, inSize)] === Tiles.BOMB) {
      cover.map((_, i) => (cover[i] = Cover.Transparent));
      setLose(true);
    }

    // Заносим все изменения в стейт
    setCover((prev) => [...prev]);
  };

  const onRightClickHandler = (e: SyntheticEvent, x: number, y: number, inSize: number) => {
    e.preventDefault();
    e.stopPropagation();

    if (cover[pos(x, y, inSize)] === Cover.Transparent) return;

    if (cover[pos(x, y, inSize)] === Cover.Hidden) {
      cover[pos(x, y, inSize)] = Cover.Flag;
    } else if (cover[pos(x, y, inSize)] === Cover.Flag) {
      cover[pos(x, y, inSize)] = Cover.QuestionMark;
    } else if (cover[pos(x, y, inSize)] === Cover.QuestionMark) {
      cover[pos(x, y, inSize)] = Cover.Hidden;
    }
    setCover((prev) => [...prev]);
  };

  return (
    <div>
      {dimension.map((_, x) => (
        <div className="field-row" key={x}>
          {dimension.map((_, y) => (
            <div
              className="field-cell"
              key={y}
              onClick={() => onClickHandler(x, y, size)}
              onContextMenu={(e) => onRightClickHandler(e, x, y, size)}
            >
              {cover[pos(x, y, size)] !== Cover.Transparent
                ? mapCoverToView[cover[pos(x, y, size)]]
                : mapTileToView[field[pos(x, y, size)]]}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
