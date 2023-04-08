import { useAppSelector, useAppDispatch } from "Hooks/hooks";
import { split } from "Actions/split";
/// NOTE: split on two different figures is not active right now ////
// NOTE: if player already split once, dont let him do it again //
export default function SplitButton() {
  const dispatch = useAppDispatch();
  const player = useAppSelector((state) => state.player);
  const bet = useAppSelector((state) => state.table.currentBet);

  const isDisabled: boolean =
    player.cards.length !== 2 ||
    player.cards[0].value !== player.cards[1].value ||
    player.balance < bet * 2;

  const handleClick = async () => {
    await dispatch(split());
  };

  return (
    <div className="button--container">
      <button
        type="button"
        className={`UI--button UI--split-button ${
          isDisabled ? "UI--button-disabled" : ""
        }`}
        onClick={handleClick}
        disabled={isDisabled}
      >
        Split
      </button>
    </div>
  );
}
