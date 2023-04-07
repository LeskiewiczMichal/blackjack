import "./cardsContainer.style.css"
// Types
import { DealerState, PlayerState } from "types";
// Components
import Card from "Components/Table/Card";


type CardsContainerProps = {
    player: DealerState | PlayerState,
}

export default function CardsContainer(props: CardsContainerProps) {
    const { player } = props;

    // Map over the cards and create a JSX element for each card
    const playerCardsJSX = player.cards.map((card, index) => {
        return <Card key={index} suit={card.suit} value={card.value} faceUp={card.faceUp} />
    });
   
    return (
        <section className="cards--container">
            {playerCardsJSX}
        </section>
    )
}