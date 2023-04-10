import { useAppSelector, useAppDispatch } from "Hooks/hooks";
import { doubleDown } from "Actions/doubleDown";
import { setAnimationOn } from "store/Reducers/tableReducer";

export default function DoubleDownButton() {
  const dispatch = useAppDispatch();
  const playerCards = useAppSelector((state) => state.player.cards);
  const playerBalance = useAppSelector((state) => state.player.balance);
  const bet = useAppSelector((state) => state.table.currentBet);
  const animationOn = useAppSelector((state) => state.table.animationOn);

  const isDisabled: boolean =
    playerCards.length !== 2 || bet * 2 > playerBalance || animationOn;

  const doubleDownHandler = async () => {
    await dispatch(setAnimationOn(true));
    await dispatch(doubleDown());
    await dispatch(setAnimationOn(false));
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
