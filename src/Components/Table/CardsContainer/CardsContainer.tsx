import './cardsContainer.style.css';
// Types
import { DealerState, PlayerState, Card as CardType } from 'types';
// Components
import Card from 'Components/Table/Card';

type CardsContainerProps = {
  cards: CardType[];
};

export default function CardsContainer(props: CardsContainerProps) {
  // Map over the cards and create a JSX element for each card
  const playerCardsJSX = props.cards.map((card, index) => {
    return <Card key={index} suit={card.suit} value={card.value} faceUp={card.faceUp} />;
  });

  return <section className='cards--container'>{playerCardsJSX}</section>;
}
