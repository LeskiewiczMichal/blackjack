import { useAppDispatch } from "Hooks/hooks";
import { finishGame } from "store/Actions/finishGame";
import { playerDidSplit } from "store/Actions/split";
import { unwrapResult } from "@reduxjs/toolkit";
import { switchHands } from "store/Actions/split";

export default function StandButton() {
    const dispatch = useAppDispatch();

    const handleClick = async () => {
        const splitActive: boolean = unwrapResult(await dispatch(playerDidSplit()));
        if (splitActive) {
            dispatch(switchHands());
        } else {
            dispatch(finishGame());
        }
    }

    return (
        <button type="button" className="UI--button UI--stand-button" onClick={handleClick}>
            Stand
        </button>
    )
}