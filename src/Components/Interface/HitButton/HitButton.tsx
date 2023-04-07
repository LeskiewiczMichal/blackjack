import { useAppDispatch } from "Hooks/hooks";
import { hit } from "store/Actions/hit";

/// NOTE: I need to disable this button when the game is not started ///

export default function HitButton() {
    const dispatch = useAppDispatch();

    const handleClick = () => {
        dispatch(hit());
    }

    return (
        <button type="button" className="UI--button UI--hit-button" onClick={handleClick}>
            Hit
        </button>
    )
}