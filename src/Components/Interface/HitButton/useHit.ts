import { Card } from "types";
import { RootState } from "store/store";
import { useAppDispatch, useAppSelector } from "Hooks/hooks";
import { drawCard } from "store/Reducers/tableReducer";
import { addCard, setPlayerScore } from "store/Reducers/playerReducer";
import { calculateScore } from "Components/Interface/Functions/calculateScore";

const useHit = () => {
    const dispatch = useAppDispatch();
    const cards = useAppSelector(state => state.table.cards);
    const playerScore = useAppSelector(state => state.player.score);
    const bet = useAppSelector(state => state.table.currentBet);
    

    const handleHit = () => {
        const randomCard: Card = cards[Math.floor(Math.random() * cards.length)];
        const newScore = calculateScore({  oldScore: playerScore, newCard: randomCard });
        dispatch(drawCard(randomCard));
        dispatch(addCard(randomCard));
        dispatch(setPlayerScore(newScore));

        // if (newScore > 21) {
        //     dispatch(playerLost(bet));
        // }
    }

    return { handleHit };
}

export default useHit;