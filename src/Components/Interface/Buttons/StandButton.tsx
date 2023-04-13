import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { finishGame } from "actions/finishGame";
import { switchHands, playerDidSplit } from "actions/split";

export default function StandButton() {
  const dispatch = useAppDispatch();
  const actionOn = useAppSelector((state) => state.table.actionOn);

  const isDisabled = actionOn;

  const standHandler = async () => {
    const splitActive = await dispatch(playerDidSplit());
    if (splitActive) {
      await dispatch(switchHands());
    } else {
      await dispatch(finishGame());
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
