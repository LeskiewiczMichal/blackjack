// Hooks
import { useAppDispatch } from "Hooks/hooks";
// Libraries
import { unwrapResult } from "@reduxjs/toolkit";
// Functions
import { finishGame } from "Actions/gameState";
import { playerDidSplit, switchHands } from "Actions/split";

export default function StandButton() {
  const dispatch = useAppDispatch();

  const handleClick = async () => {
    const splitActive: boolean = unwrapResult(await dispatch(playerDidSplit()));
    if (splitActive) {
      dispatch(switchHands());
    } else {
      dispatch(finishGame());
    }
  };

  return (
    <button
      type="button"
      className="UI--button UI--stand-button"
      onClick={handleClick}
    >
      Stand
    </button>
  );
}
