import { useAppDispatch, useAppSelector } from 'Hooks/hooks';
import { rebet } from 'store/Actions/gameState';

export default function RebetButton() {
  const dispatch = useAppDispatch();
  const playerBalance = useAppSelector((state) => state.player.balance);
  const bet = useAppSelector((state) => state.table.currentBet);

  const isDisabled: boolean = playerBalance < bet;

  const handleClick = () => {
    dispatch(rebet());
  };

  return (
    <button
      type='button'
      className={`UI--button UI--hit-button ${isDisabled ? 'UI--button-disabled' : ''}`}
      onClick={handleClick}
      disabled={isDisabled}
    >
      REBET
    </button>
  );
}
