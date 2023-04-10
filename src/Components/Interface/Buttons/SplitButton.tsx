import { useAppSelector, useAppDispatch } from "hooks/hooks";
import { split } from "actions/split";
import { isFigure } from "utils/isFigure";

export default function SplitButton() {
  const dispatch = useAppDispatch();
  const player = useAppSelector((state) => state.player);
  const bet = useAppSelector((state) => state.table.currentBet);
  const secondScore = useAppSelector((state) => state.player.secondScore);
  const animationOn = useAppSelector((state) => state.table.animationOn);
  const { cards, balance } = player;
  const firstCard = player.cards[0];
  const secondCard = player.cards[1];

  let isDisabled: boolean;

  if (animationOn) {
    isDisabled = true;
  } else if (cards.length !== 2) {
    isDisabled = true;
  } else if (secondScore !== null) {
    isDisabled = true;
  } else if (
    // Card values are different, but both are figures so can split
    firstCard.value !== secondCard.value &&
    isFigure({ card: firstCard }) &&
    isFigure({ card: secondCard })
  ) {
    isDisabled = false;
  } else if (firstCard.value !== secondCard.value) {
    isDisabled = true;
  } else if (balance < bet * 2) {
    isDisabled = true;
  } else {
    isDisabled = false;
  }

  const splitHandler = async () => {
    await dispatch(split());
  };

  return (
    <div className="button--container">
      <button
        type="button"
        className={`UI--button UI--split-button ${
          isDisabled ? "UI--button-disabled" : ""
        }`}
        onClick={splitHandler}
        // disabled={isDisabled}
      >
        SPLIT
      </button>
    </div>
  );
}
