import { Card } from "types";
import { RootState } from "store/store";
import { useDispatch, useSelector } from "react-redux"
import { deal, drawCard } from "store/Reducers/tableReducer"
import { addCard as playerAddCard } from "store/Reducers/playerReducer";
import { addCard as dealerAddCard } from "store/Reducers/dealerReducer";


const useDeal = () => {
    const cards = useSelector((state: RootState) => state.table.cards);
    const dispatch = useDispatch();

    const handleDeal = () => {
        // Draw random cards for dealer and player
        dispatch(deal());
        for (let i = 0; i < 2; i++) {
            const randomCard: Card = cards[Math.floor(Math.random() * cards.length)];
            dispatch(drawCard(randomCard));
            dispatch(playerAddCard(randomCard));


            let randomCard2: Card = cards[Math.floor(Math.random() * cards.length)];
            dispatch(drawCard(randomCard2));
            if (i === 0) {
                randomCard2 = { ...randomCard2, faceUp: false };
            }
            dispatch(dealerAddCard(randomCard2));
        }
    
    }

    return { handleDeal };
}

export default useDeal;