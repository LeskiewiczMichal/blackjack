import { makeDeal } from "Actions/bets";
import { useAppDispatch, useAppSelector } from "Hooks/hooks";
import { setAnimationOn } from "store/Reducers/tableReducer";

export default function DealButton() {
  const dispatch = useAppDispatch();
  const currentBet = useAppSelector((state) => state.table.currentBet);
  const animationOn = useAppSelector((state) => state.table.animationOn);

  const isDisabled: boolean = currentBet === 0 || animationOn;

  const dealHandler = async () => {
    await dispatch(setAnimationOn(true));
    await dispatch(makeDeal());
    await dispatch(setAnimationOn(false));
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
