import { useEffect } from "react";
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

  // useEffect(() => {

  // }, [faceUp])

  // Check what card to render
  // if (!faceUp) {
  //   return <div className={`card card--back ${animationClass} card--rotate`} />;
  // }

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
    <div
      className={`card ${animationClass}`}
      // style={style}
    >
      <div className="card--back" />
      {cardFace}
    </div>
  );

  if (value === CardValue.ACE) {
    return (
      <div
        className={`card ${animationClass} ${!faceUp ? "card--rotate" : ""}`}
      >
        <div className="card--back" />
        <div className={`${suit}A card--front`} />
      </div>
    );
    return <div className={`card card--back ${suit}A ${animationClass}`} />;
  }
  if (value === CardValue.JACK) {
    return (
      <div
        className={`card ${animationClass} ${!faceUp ? "card--rotate" : ""}`}
      >
        <div className="card--back" />
        <div className={`${suit}J card--front`} />
      </div>
    );
  }
  if (value === CardValue.QUEEN) {
    return (
      <div
        className={`card ${animationClass} ${!faceUp ? "card--rotate" : ""}`}
      >
        <div className="card--back" />
        <div className={`${suit}Q card--front`} />
      </div>
    );
    return <div className={`card card--back ${suit}Q ${animationClass}`} />;
  }
  if (value === CardValue.KING) {
    return (
      <div
        className={`card ${animationClass} ${!faceUp ? "card--rotate" : ""}`}
      >
        <div className="card--back" />
        <div className={`${suit}K card--front`} />
      </div>
    );
    return <div className={`card card--back ${suit}K ${animationClass}`} />;
  }
  return (
    <div className={`card ${animationClass} ${!faceUp ? "card--rotate" : ""}`}>
      <div className="card--back" />
      <div className={`${suit}${value} card--front`} />
    </div>
  );
  return (
    <div className={`card card--back ${suit}${value} ${animationClass}`} />
  );
}
