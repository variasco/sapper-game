import { ReactNode } from "react";

export interface TimerProps {
  time: number;
}

export enum Digits {
  ZERO,
  ONE,
  TWO,
  THREE,
  FOUR,
  FIVE,
  SIX,
  SEVEN,
  EIGHT,
  NINE,
}

const mapDigitsToView: Record<Digits, ReactNode> = {
  [Digits.ZERO]: <img src="sprites/digit_0.png" alt="" />,
  [Digits.ONE]: <img src="sprites/digit_1.png" alt="" />,
  [Digits.TWO]: <img src="sprites/digit_2.png" alt="" />,
  [Digits.THREE]: <img src="sprites/digit_3.png" alt="" />,
  [Digits.FOUR]: <img src="sprites/digit_4.png" alt="" />,
  [Digits.FIVE]: <img src="sprites/digit_5.png" alt="" />,
  [Digits.SIX]: <img src="sprites/digit_6.png" alt="" />,
  [Digits.SEVEN]: <img src="sprites/digit_7.png" alt="" />,
  [Digits.EIGHT]: <img src="sprites/digit_8.png" alt="" />,
  [Digits.NINE]: <img src="sprites/digit_9.png" alt="" />,
};

export const Timer = (props: TimerProps) => {
  const { time } = props;

  return (
    <>
      {mapDigitsToView[(Math.floor(time / 100) % 10) as Digits]}
      {mapDigitsToView[(Math.floor(time / 10) % 10) as Digits]}
      {mapDigitsToView[(time % 10) as Digits]}
    </>
  );
};
