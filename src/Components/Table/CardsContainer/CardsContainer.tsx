import "./cardsContainer.style.css";
import { Card as CardType } from "types";
import Card from "Components/Table/Card/Card";
import { TransitionGroup, CSSTransition } from "react-transition-group";

type CardsContainerProps = {
  cards: CardType[];
};

// transitiongroup
export default function CardsContainer(props: CardsContainerProps) {
  // Map over the cards and create a JSX element for each card
  const { cards } = props;

  return (
    <TransitionGroup className="cards--container">
      {cards.map((card, index) => (
        <CSSTransition
          // Index as a key is needed here for animations to work
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
