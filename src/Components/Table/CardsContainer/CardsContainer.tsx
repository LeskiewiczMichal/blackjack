import "./cardsContainer.style.css";
import { Card as CardType } from "types";
import Card from "components/table/card/Card";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useAppSelector } from "hooks/hooks";

type CardsContainerProps = {
  cards: CardType[];
};

export default function CardsContainer(props: CardsContainerProps) {
  // Map over the cards and create a JSX element for each card
  const { cards } = props;
  const disableAnimations = useAppSelector(
    (state) => state.helpers.disableSwapHandsAnimation,
  );

  if (disableAnimations) {
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
          />
        ))}
      </section>
    );
  }

  return (
    <TransitionGroup className="cards--container">
      {cards.map((card, index) => (
        <CSSTransition
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          classNames={{
            enterActive: "card--enter-active",
            exitActive: "card--exit-active",
          }}
          timeout={900}
        >
          <Card suit={card.suit} value={card.value} faceUp={card.faceUp} />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
}
