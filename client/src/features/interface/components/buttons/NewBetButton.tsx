import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { setSweepCards } from "store/reducers/helperReducer";
import { clearTable } from "../../actions/clearTable";

export default function NewBetButton() {
  const dispatch = useAppDispatch();
  const actionOn = useAppSelector((state) => state.table.actionOn);

  const isDisabled = actionOn;

  const newBetHandler = async () => {
    await dispatch(setSweepCards(true));
    // eslint-disable-next-line no-promise-executor-return
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for animation to end
    await dispatch(clearTable());
    await dispatch(setSweepCards(false));
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
