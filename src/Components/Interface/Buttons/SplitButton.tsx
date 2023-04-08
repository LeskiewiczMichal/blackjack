import { useAppSelector, useAppDispatch } from 'Hooks/hooks';
import { split } from 'store/Actions/split';

export default function SplitButton() {
  const dispatch = useAppDispatch();
  const player = useAppSelector((state) => state.player);
  const bet = useAppSelector((state) => state.table.currentBet);

  // let buttonActive: boolean = (playerCards.length === 2 && playerCards[0].value === playerCards[1].value);
  const isDisabled: boolean =
    player.cards.length !== 2 ||
    player.cards[0].value !== player.cards[1].value ||
    player.balance < bet * 2;

  const handleClick = () => {
    dispatch(split());
  };

  return (
    <div className='button--container'>
      <button
        type='button'
        className={`UI--button UI--split-button ${isDisabled ? 'UI--button-disabled' : ''}`}
        onClick={handleClick}
        disabled={isDisabled}
      >
        Split
      </button>
    </div>
  );
}
