import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { rebet } from "actions/gameState";
import { setActionOn } from "store/reducers/tableReducer";

export default function RebetButton() {
  const dispatch = useAppDispatch();
  const playerBalance = useAppSelector((state) => state.player.balance);
  const bet = useAppSelector((state) => state.table.currentBet);
  const actionOn = useAppSelector((state) => state.table.actionOn);

  const isDisabled: boolean = playerBalance < bet || actionOn;

  const rebetHandler = async () => {
    await dispatch(setActionOn(true));
    await dispatch(rebet());
    await dispatch(setActionOn(false));
  };

  return (
    <button
      type="button"
      className={`UI--button UI--rebet-button ${
        isDisabled ? "UI--button-disabled" : ""
      }`}
      onClick={rebetHandler}
      disabled={isDisabled}
    >
      REBET
    </button>
  );
}
