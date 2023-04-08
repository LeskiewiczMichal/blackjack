import { makeDeal } from "Actions/bets";
import { useAppDispatch, useAppSelector } from "Hooks/hooks";

export default function DealButton() {
  const dispatch = useAppDispatch();
  const currentBet = useAppSelector((state) => state.table.currentBet);

  const isDisabled: boolean = currentBet === 0;

  const handleClick = () => {
    dispatch(makeDeal());
  };

  return (
    <button
      type="button"
      className={`UI--button UI--deal-button ${
        isDisabled ? "UI--button-disabled" : ""
      }`}
      onClick={handleClick}
      disabled={isDisabled}
    >
      Deal
    </button>
  );
}
