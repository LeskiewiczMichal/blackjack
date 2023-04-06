import { Card } from "types";
import { RootState } from "store/store";
import { useDispatch, useSelector } from "react-redux";
import { drawCard } from "store/Reducers/tableReducer";
import { addCard } from "store/Reducers/playerReducer";

const useHit = () => {
    const dispatch = useDispatch();
    const cards = useSelector((state: RootState) => state.table.cards);

    const handleHit = () => {
        const randomCard: Card = cards[Math.floor(Math.random() * cards.length)];
        dispatch(drawCard(randomCard));
        dispatch(addCard(randomCard));
    }

    return { handleHit };
}

export default useHit;