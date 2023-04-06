import { Card } from "../../types";
import { useDispatch, useSelector } from "react-redux"
import { deal, drawCard } from "../../store/Reducers/tableReducer"
import { addCard as playerAddCard } from "../../store/Reducers/playerReducer";
import { addCard as dealerAddCard } from "../../store/Reducers/dealerReducer";

import { RootState } from "../../store/store";



export default function DealButton() {
    const cards = useSelector((state: RootState) => state.table.cards);
    const dispatch = useDispatch();

    const handleClick = () => {
        // Draw random cards for dealer and player
        dispatch(deal());
        for (let i = 0; i < 2; i++) {
            const randomCard: Card = cards[Math.floor(Math.random() * cards.length)];
            dispatch(drawCard(randomCard));
            dispatch(playerAddCard(randomCard));

            const randomCard2: Card = cards[Math.floor(Math.random() * cards.length)];
            dispatch(drawCard(randomCard2));
            dispatch(dealerAddCard(randomCard2));
        }
        
    }

    return (
        <button type="button" className="UI--button UI--deal-button" onClick={handleClick}>
            Deal
        </button>
    )
}