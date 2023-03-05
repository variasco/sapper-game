import { Tiles } from "../ui/Field";

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