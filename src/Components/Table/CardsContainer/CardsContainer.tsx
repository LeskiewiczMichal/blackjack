import "./cardsContainer.style.css"

import { useSelector } from "react-redux";
import { RootState } from "store/store";

import { DealerState, PlayerState } from "types";
import Card from "Components/Card";


type CardsContainerProps = {
    player: DealerState | PlayerState,
}

export default function CardsContainer(props: CardsContainerProps) {
    const { player } = props;
     const playerCardsJSX = player.cards.map((card, index) => {
        return <Card key={index} suit={card.suit} value={card.value} faceUp={card.faceUp} />
    });
   

    return (
        <section className="cards--container">
            {playerCardsJSX}
        </section>
    )
}