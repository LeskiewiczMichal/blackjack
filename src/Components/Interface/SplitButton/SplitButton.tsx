
import { useAppSelector } from "Hooks/hooks";
import isSplitActive from "./isSplitActive";

export default function SplitButton() {
  const playerCards = useAppSelector((state) => state.player.cards);

  let buttonActive: boolean = isSplitActive({ cards: playerCards });

  return (
    <div className="button--container">
      <button type="button" className={`UI--button UI--split-button ${buttonActive ? '' : 'UI--button-disabled'}`}
      >
        Split
      </button>
    </div>
  );
}
