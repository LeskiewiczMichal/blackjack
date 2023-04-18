import "./card.style.css";
import { CardValue, CardSuit } from "types.d";

export type CardProps = {
  suit: CardSuit;
  value: CardValue;
  animationClass: string;
};

export default function Card(props: CardProps) {
  const { value, suit, animationClass } = props;

  let cardFace: JSX.Element;
  if (value === CardValue.ACE) {
    cardFace = <div className={`${suit}A card--front`} />;
  } else if (value === CardValue.JACK) {
    cardFace = <div className={`${suit}J card--front`} />;
  } else if (value === CardValue.QUEEN) {
    cardFace = <div className={`${suit}Q card--front`} />;
  } else if (value === CardValue.KING) {
    cardFace = <div className={`${suit}K card--front`} />;
  } else {
    cardFace = <div className={`${suit}${value} card--front`} />;
  }

  return (
    <div className={`card ${animationClass}`}>
      <div className="card--back" />
      {cardFace}
    </div>
  );
}
