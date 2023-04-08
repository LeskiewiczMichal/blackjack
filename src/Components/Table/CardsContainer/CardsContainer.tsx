import "./cardsContainer.style.css";
import { nanoid } from "nanoid";
// Types
import { Card as CardType } from "types";
// Components
import Card from "Components/Table/Card";

type CardsContainerProps = {
  cards: CardType[];
};

export default function CardsContainer(props: CardsContainerProps) {
  // Map over the cards and create a JSX element for each card
  const { cards } = props;
  const playerCardsJSX = cards.map((card) => (
    <Card
      key={nanoid()}
      suit={card.suit}
      value={card.value}
      faceUp={card.faceUp}
    />
  ));

  return <section className="cards--container">{playerCardsJSX}</section>;
}
