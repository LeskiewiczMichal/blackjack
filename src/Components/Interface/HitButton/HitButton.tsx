import useHit from "./useHit"
import { RootState } from "store/store";
import { useAppSelector, useAppDispatch } from "Hooks/hooks";
import { playerOverTwentyOne } from "Components/Table/Helpers/playerOverTwentyOne";
import { playerDrawCard } from "store/Actions/playerDrawCard";
import { finishGame } from "store/Actions/finishGame";

export default function HitButton() {
    const dispatch = useAppDispatch();
    const player = useAppSelector(state => state.player);
    // const { handleHit } = useHit();

    const handleClick = () => {
        dispatch(playerDrawCard());
        if (player.score > 21) {
            dispatch(finishGame());
        }
    }

    return (
        <button type="button" className="UI--button UI--hit-button" onClick={handleClick}>
            Hit
        </button>
    )
}