import "./card.style.css";
import { CardValue, CardSuit } from "types.d";

export type CardProps = {
  suit: CardSuit;
  value: CardValue;
  faceUp: boolean;
  animationClass: string;
};

export default function Card(props: CardProps) {
  const { value, suit, faceUp, animationClass } = props;

  // Check what card to render
  if (!faceUp) {
    return <div className={`card card--back ${animationClass}`} />;
  }
  if (value === CardValue.ACE) {
    return <div className={`card ${suit}A ${animationClass}`} />;
  }
  if (value === CardValue.JACK) {
    return <div className={`card ${suit}J ${animationClass}`} />;
  }
  if (value === CardValue.QUEEN) {
    return <div className={`card ${suit}Q ${animationClass}`} />;
  }
  if (value === CardValue.KING) {
    return <div className={`card ${suit}K ${animationClass}`} />;
  }

  return <div className={`card ${suit}${value} ${animationClass}`} />;
}
