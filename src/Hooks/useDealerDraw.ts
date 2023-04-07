import { Card } from "types"

import { useAppDispatch, useAppSelector } from "./hooks"
import { addCard as dealerAddCard } from "store/Reducers/dealerReducer"
import { drawCard } from "store/Reducers/tableReducer"

const useDealerDraw = () => {
    const dispatch = useAppDispatch();
    const cards = useAppSelector(state => state.table.cards);

    const handleDealerDraw = (dealerScore: number) => {
        console.log(dealerScore);
        let score = dealerScore;
        if (score < 17) {
            const randomCard: Card = cards[Math.floor(Math.random() * cards.length)];
            dispatch(drawCard(randomCard));
            dispatch(dealerAddCard(randomCard));            
            score += randomCard.value;
        }

        return score;
    }

    return { handleDealerDraw };
}

export default useDealerDraw;