import 'Components/Styles/card.style.css';

// Types
import { CardValue, CardSuit } from 'types.d';

export type CardProps = {
  suit: CardSuit;
  value: CardValue;
  faceUp: boolean;
};

export default function Card(props: CardProps) {
  // Check what card to render
  if (!props.faceUp) {
    return <div className='card card--back'></div>;
  }
  if (props.value === CardValue.ACE) {
    return <div className={`card ${props.suit}A`}></div>;
  }
  if (props.value === CardValue.JACK) {
    return <div className={`card ${props.suit}J`}></div>;
  }
  if (props.value === CardValue.QUEEN) {
    return <div className={`card ${props.suit}Q`}></div>;
  }
  if (props.value === CardValue.KING) {
    return <div className={`card ${props.suit}K`}></div>;
  }

  return <div className={`card ${props.suit}${props.value}`}></div>;
}
