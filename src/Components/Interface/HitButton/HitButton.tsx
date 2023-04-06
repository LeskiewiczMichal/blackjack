import useHit from "./useHit"
import { RootState } from "store/store";
import { useAppSelector,useAppDispatch } from "Hooks/hooks";
import { playerOverTwentyOne } from "Components/Table/Helpers/playerOverTwentyOne";

export default function HitButton() {
    const player = useAppSelector(state => state.player);
    const { handleHit } = useHit();

    const handleClick = () => {
        handleHit();
        if (playerOverTwentyOne({ player: player })) {
            console.log("Player lost");
        }
    }

    return (
        <button type="button" className="UI--button UI--hit-button" onClick={handleClick}>
            Hit
        </button>
    )
}