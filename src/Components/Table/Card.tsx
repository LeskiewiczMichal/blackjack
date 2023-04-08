import "Components/Styles/card.style.css";

// Types
import { CardValue, CardSuit } from "types.d";

export type CardProps = {
  suit: CardSuit;
  value: CardValue;
  faceUp: boolean;
};

export default function Card(props: CardProps) {
  // Check what card to render
  if (!props.faceUp) {
    return <div className="card card--back" />;
  }
  if (props.value === CardValue.ACE) {
    return <div className={`card ${props.suit}A`} />;
  }
  if (props.value === CardValue.JACK) {
    return <div className={`card ${props.suit}J`} />;
  }
  if (props.value === CardValue.QUEEN) {
    return <div className={`card ${props.suit}Q`} />;
  }
  if (props.value === CardValue.KING) {
    return <div className={`card ${props.suit}K`} />;
  }

  return <div className={`card ${props.suit}${props.value}`} />;
}
