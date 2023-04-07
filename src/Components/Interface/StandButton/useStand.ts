import { useAppDispatch, useAppSelector } from "Hooks/hooks"
import useGameState from "Hooks/useGameState";
import useDealerDraw from "Hooks/useDealerDraw";
import { showCards } from "store/Reducers/dealerReducer";
import { gameFinished } from "store/Reducers/tableReducer";

const useStand = () => {
    const dispatch = useAppDispatch();

    const handleStand = async () => {
        dispatch(showCards());
        dispatch(gameFinished(true));

        // const newScore = handleDealerDraw(dealerScore);
        // handleCheckResult(newScore);


        // if (playerScore > dealerScore) {
        //     dispatch(playerWon());;
        // } else if (playerScore < dealerScore) {
        //     dispatch(playerLost());
        // } else {
        //     dispatch(draw());
        // }
    }

    return { handleStand };
}

export default useStand;