import { useAppSelector, useAppDispatch } from "hooks/hooks";
import { doubleDown } from "actions/doubleDown";

export default function DoubleDownButton() {
  const dispatch = useAppDispatch();
  const playerCards = useAppSelector((state) => state.player.cards);
  const playerBalance = useAppSelector((state) => state.player.balance);
  const bet = useAppSelector((state) => state.table.currentBet);
  const actionOn = useAppSelector((state) => state.table.actionOn);

  const isDisabled: boolean =
    playerCards.length !== 2 || bet * 2 > playerBalance || actionOn;

  const doubleDownHandler = async () => {
    await dispatch(doubleDown());
  };

  return (
    <button
      type="button"
      className={`UI--button UI--doubleDown-button ${
        isDisabled ? "UI--button-disabled" : ""
      }`}
      onClick={doubleDownHandler}
      disabled={isDisabled}
    >
      DOUBLE DOWN
    </button>
  );
}
