import "./card.style.css";
import { CardValue, CardSuit } from "types.d";

export type CardProps = {
  suit: CardSuit;
  value: CardValue;
  faceUp: boolean;
};

export default function Card(props: CardProps) {
  const { value, suit, faceUp } = props;

  // Check what card to render
  if (!faceUp) {
    return <div className="card card--back card--enter-active" />;
  }
  if (value === CardValue.ACE) {
    return <div className={`card ${suit}A card--enter-active`} />;
  }
  if (value === CardValue.JACK) {
    return <div className={`card ${suit}J card--enter-active`} />;
  }
  if (value === CardValue.QUEEN) {
    return <div className={`card ${suit}Q card--enter-active`} />;
  }
  if (value === CardValue.KING) {
    return <div className={`card ${suit}K card--enter-active`} />;
  }

  return <div className={`card ${suit}${value} card--enter-active`} />;
}
