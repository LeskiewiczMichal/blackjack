import { useAppDispatch } from "Hooks/hooks";
import { finishGame } from "store/Actions/finishGame";

export default function StandButton() {
    const dispatch = useAppDispatch();

    const handleClick = () => {
        dispatch(finishGame());
    }

    return (
        <button type="button" className="UI--button UI--stand-button" onClick={handleClick}>
            Stand
        </button>
    )
}