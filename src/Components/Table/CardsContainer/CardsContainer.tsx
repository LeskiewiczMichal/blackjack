import "./cardsContainer.style.css";
import { Card as CardType } from "types";
import Card from "components/table/card/Card";
import { useAppSelector } from "hooks/hooks";
import { useEffect, useState } from "react";

type CardsContainerProps = {
  cards: CardType[];
};

export default function CardsContainer(props: CardsContainerProps) {
  // Map over the cards and create a JSX element for each card
  const { cards } = props;
  const disableAnimations = useAppSelector(
    (state) => state.helpers.disableSwapHandsAnimation,
  );
  const [alreadyAnimated, setAlreadyAnimated] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  useEffect(() => {
    // Set alreadyAnimated to true for all indices after component is rendered
    if (disableAnimations) {
      setAlreadyAnimated((prev) => {
        const newAlreadyAnimated = [...prev];
        for (let i = 0; i < cards.length; i++) {
          newAlreadyAnimated[i] = true;
        }
        return newAlreadyAnimated;
      });
    }
  }, [disableAnimations]);

  return (
    <section className="cards--container">
      {cards.map((card, index) => (
        <Card
          // Index as a key is needed here for animations to work
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          suit={card.suit}
          value={card.value}
          faceUp={card.faceUp}
          animationClass={alreadyAnimated[index] === true ? "" : "card--enter"}
        />
      ))}
    </section>
  );
}
