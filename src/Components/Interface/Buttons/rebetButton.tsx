import { useAppDispatch, useAppSelector } from "Hooks/hooks";
import { rebet } from "Actions/gameState";

export default function RebetButton() {
  const dispatch = useAppDispatch();
  const playerBalance = useAppSelector((state) => state.player.balance);
  const bet = useAppSelector((state) => state.table.currentBet);

  const isDisabled: boolean = playerBalance < bet;

  const rebetHandler = () => {
    dispatch(rebet());
  };

  return (
    <button
      type="button"
      className={`UI--button UI--hit-button ${
        isDisabled ? "UI--button-disabled" : ""
      }`}
      onClick={rebetHandler}
      disabled={isDisabled}
    >
      REBET
    </button>
  );
}
