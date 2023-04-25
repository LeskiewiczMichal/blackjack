import "./cardsContainer.scss";
import { Card as CardType, PlayerType } from "types.d";
import Card from "features/table/components/Card";
import { useAppSelector } from "hooks/hooks";
import { useEffect, useState } from "react";

type CardsContainerProps = {
  cards: CardType[];
  player: PlayerType;
};

export default function CardsContainer(props: CardsContainerProps) {
  // Map over the cards and create a JSX element for each card
  const { cards, player } = props;
  const disableAnimations = useAppSelector(
    (state) => state.helpers.disableSwapHandsAnimation,
  );
  const sweepCards = useAppSelector((state) => state.helpers.sweepCards);
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

  // Used on split to set alreadyAnimated for cards that are already rendered, so they don't animate again
  useEffect(() => {
    if (disableAnimations) {
      const newAlreadyAnimated = [...alreadyAnimated];
      cards.forEach((card, index) => {
        if (card.faceUp) {
          newAlreadyAnimated[index] = true;
        }
      });
      setAlreadyAnimated(newAlreadyAnimated);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disableAnimations]);

  const getCurrentAnimation = (index: number): string => {
    if (sweepCards) {
      return "card--exit";
    }

    if (cards[index].faceUp && index === 0 && player === PlayerType.DEALER) {
      return "card--rotate";
    }

    if (alreadyAnimated[index]) {
      return "";
    }

    if (cards[index].faceUp) {
      return "card--enter";
    }

    return "card--enter-back-shown";
  };

  return (
    <section className="cards--container">
      {cards.map((card, index) => (
        <Card
          // Index as a key is needed here for animations to work
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          suit={card.suit}
          value={card.value}
          animationClass={getCurrentAnimation(index)}
        />
      ))}
    </section>
  );
}
