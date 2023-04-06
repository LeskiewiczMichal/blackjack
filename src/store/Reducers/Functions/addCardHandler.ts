import { Card } from "types.d"
// const card: Card = action.payload;
//             state.cards.push(card);
//             state.score = calculateScore({ cards: state.cards });

type AddCardProps = {
    cards: Card[],
}

export function addCardHandler(props: AddCardProps, newCard: Card) {
    const { cards } = props;
    cards.push(newCard);
    
    return cards;
}