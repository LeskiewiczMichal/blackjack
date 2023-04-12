import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { clearTable } from "actions/clearTable";
import { setActionOn } from "store/reducers/tableReducer";

export default function NewBetButton() {
  const dispatch = useAppDispatch();
  const actionOn = useAppSelector((state) => state.table.actionOn);

  const isDisabled = actionOn;

  const newBetHandler = async () => {
    await dispatch(setActionOn(true));
    await dispatch(clearTable());
    await dispatch(setActionOn(false));
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
