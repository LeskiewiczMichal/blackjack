import useStand from "./useStand";
import { useAppSelector, useAppDispatch } from "Hooks/hooks";
import { finishGame } from "store/Actions/finishGame";

export default function StandButton() {
    const dispatch = useAppDispatch();

    // const { handleStand } = useStand();
    // const table = useAppSelector(state => state.table);

    // const handleClick = () => {
    //     // handleStand();
    //     // logDealer();
    //     table.currentBet = 2;
    //     console.log(table.currentBet);
    // }
    const handleClick = () => {
        dispatch(finishGame());
    }

    return (
        <button type="button" className="UI--button UI--stand-button" onClick={handleClick}>
            Stand
        </button>
    )
}