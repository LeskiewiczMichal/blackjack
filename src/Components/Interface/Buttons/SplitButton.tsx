import { useAppSelector, useAppDispatch } from "Hooks/hooks";
import { split } from "store/Actions/split";

export default function SplitButton() {
  const dispatch = useAppDispatch();
  const playerCards = useAppSelector((state) => state.player.cards);

  
  // let buttonActive: boolean = (playerCards.length === 2 && playerCards[0].value === playerCards[1].value);
  const buttonActive = true;

  const handleClick = () => {
      dispatch(split());
  }

  return (
    <div className="button--container">
      <button type="button" className={`UI--button UI--split-button ${buttonActive ? '' : 'UI--button-disabled'}`}
        onClick={handleClick}
      >
        Split
      </button>
    </div>
  );
}
