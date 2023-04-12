import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { setActionOn } from "store/reducers/tableReducer";
import { deal } from "actions/deal";

export default function DealButton() {
  const dispatch = useAppDispatch();
  const currentBet = useAppSelector((state) => state.table.currentBet);
  const actionOn = useAppSelector((state) => state.table.actionOn);

  const isDisabled: boolean = currentBet === 0 || actionOn;

  const dealHandler = async () => {
    await dispatch(setActionOn(true));
    await dispatch(deal());
    await dispatch(setActionOn(false));
  };

  return (
    <button
      type="button"
      className={`UI--button UI--deal-button ${
        isDisabled ? "UI--button-disabled" : ""
      }`}
      onClick={dealHandler}
      disabled={isDisabled}
    >
      DEAL
    </button>
  );
}
