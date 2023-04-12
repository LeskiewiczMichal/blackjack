import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { rebet } from "actions/gameState";
import { setAnimationOn } from "store/reducers/tableReducer";

export default function RebetButton() {
  const dispatch = useAppDispatch();
  const playerBalance = useAppSelector((state) => state.player.balance);
  const bet = useAppSelector((state) => state.table.currentBet);
  const animationOn = useAppSelector((state) => state.table.animationOn);

  const isDisabled: boolean = playerBalance < bet || animationOn;

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
