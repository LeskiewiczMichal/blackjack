import { useAppSelector } from "Hooks/hooks";

export default function SplitButton() {
  const playerCards = useAppSelector((state) => state.player.cards);


  let buttonActive: boolean = (playerCards.length === 2 && playerCards[0].value === playerCards[1].value);

  return (
    <div className="button--container">
      <button type="button" className={`UI--button UI--split-button ${buttonActive ? '' : 'UI--button-disabled'}`}
      >
        Split
      </button>
    </div>
  );
}
