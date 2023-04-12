import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { clearTable } from "actions/clearTable";
import { setAnimationOn } from "store/reducers/tableReducer";

export default function NewBetButton() {
  const dispatch = useAppDispatch();
  const animationOn = useAppSelector((state) => state.table.animationOn);


  const isDisabled = animationOn;

  const newBetHandler = async () => {
    await dispatch(setAnimationOn(true));
    await dispatch(clearTable());
    await dispatch(setAnimationOn(false));
  };

  return (
    <button
      type="button"
      className="UI--button UI--newBet-button"
      onClick={newBetHandler}
      disabled={isDisabled}
    >
      NEW BET
    </button>
  );
}
