import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { finishGame } from "actions/gameState";
import { switchHands, playerDidSplit } from "actions/split";
import { setActionOn } from "store/reducers/tableReducer";

export default function StandButton() {
  const dispatch = useAppDispatch();
  const actionOn = useAppSelector((state) => state.table.actionOn);

  const isDisabled = actionOn;

  const standHandler = async () => {
    const splitActive = await dispatch(playerDidSplit());
    await dispatch(setActionOn(true));
    if (splitActive) {
      await dispatch(switchHands());
    } else {
      await dispatch(finishGame());
    }
    await dispatch(setActionOn(false));
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
