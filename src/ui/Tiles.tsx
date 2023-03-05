type Skin =
  | "hidden"
  | "flag"
  | "down"
  | "question"
  | "question_down"
  | "digit_1"
  | "digit_2"
  | "digit_3"
  | "digit_4"
  | "digit_5"
  | "digit_6"
  | "digit_7"
  | "digit_8"
  | "bomb"
  | "bomb_missing"
  | "bomb_exploded";

export interface TileProps {
  skin?: Skin;
}

export const Tile = (props: TileProps) => {
  const { skin = "hidden" } = props;

  return <img src={`sprites/tile_${skin}.png`} alt={`tile_${skin}`} />;
};
