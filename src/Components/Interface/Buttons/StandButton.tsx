import { useAppDispatch, useAppSelector } from "Hooks/hooks";
import { unwrapResult } from "@reduxjs/toolkit";
import { finishGame } from "Actions/gameState";
import { switchHands, playerDidSplit } from "Actions/split";

export default function StandButton() {
  const dispatch = useAppDispatch();
  const animationOn = useAppSelector((state) => state.table.animationOn);

  const isDisabled = animationOn;

  const standHandler = async () => {
    const splitActive = unwrapResult(await dispatch(playerDidSplit()));
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
      onClick={standHandler}
      disabled={isDisabled}
    >
      STAND
    </button>
  );
}
