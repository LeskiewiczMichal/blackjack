import "./card.scss";

import { CardValue, CardSuit } from "types.d";
import { useAppSelector } from "hooks/hooks";

export type CardProps = {
  suit: CardSuit;
  value: CardValue;
  animationClass: string;
};

export default function Card(props: CardProps) {
  const { value, suit, animationClass } = props;
  const skin = useAppSelector((state) => state.skins.cards);

  let skinClass = "--Default";
  if (skin) {
    skinClass = `--${skin.name}`;
  }

  let cardFace: JSX.Element;
  if (value === CardValue.ACE) {
    cardFace = <div className={`${suit}A${skinClass} card--front`} />;
  } else if (value === CardValue.JACK) {
    cardFace = <div className={`${suit}J${skinClass} card--front`} />;
  } else if (value === CardValue.QUEEN) {
    cardFace = <div className={`${suit}Q${skinClass} card--front`} />;
  } else if (value === CardValue.KING) {
    cardFace = <div className={`${suit}K${skinClass} card--front`} />;
  } else {
    cardFace = <div className={`${suit}${value}${skinClass} card--front`} />;
  }

  return (
    <div className={`card ${skinClass} ${animationClass}`}>
      <div className={`card--back${skinClass}`} />
      {cardFace}
    </div>
  );
}
