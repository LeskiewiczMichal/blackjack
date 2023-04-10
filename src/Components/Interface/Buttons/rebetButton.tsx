import { useAppDispatch, useAppSelector } from "Hooks/hooks";
import { rebet } from "Actions/gameState";
import { setAnimationOn } from "store/Reducers/tableReducer";

export default function RebetButton() {
  const dispatch = useAppDispatch();
  const playerBalance = useAppSelector((state) => state.player.balance);
  const bet = useAppSelector((state) => state.table.currentBet);

  const isDisabled: boolean = playerBalance < bet;

  const rebetHandler = async () => {
    await dispatch(setAnimationOn(true));
    await dispatch(rebet());
    await dispatch(setAnimationOn(false));
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
