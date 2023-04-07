// import { useAppSelector, useAppDispatch } from "./hooks"
// import { playerWon, playerLost} from "store/Reducers/playerReducer";

const useCheckResult = () => {
    // const dispatch = useAppDispatch();

    const handleCheckResult = (playerScore: number, dealerScore: number, bet: number) => {
        // console.log(dealer)
        if (playerScore > dealerScore) {
            // dispatch(playerWon(bet));
        } else if (playerScore < dealerScore) {
            // dispatch(playerLost(bet));
        } else {
            // dispatch(draw());
        }
    }

    return { handleCheckResult };
}

export default useCheckResult;
