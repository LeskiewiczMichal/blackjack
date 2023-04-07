import { useAppSelector } from "Hooks/hooks"

export default function DoubleDownButton() {
    const playerCards = useAppSelector(state => state.player.cards);

    let buttonActive: boolean = playerCards.length === 2;

    return (
        <button type="button"
            className={`UI--button UI--doubleDown-button ${buttonActive ? '' : 'UI--button-disabled'}`}
        >
            Double Down
        </button>
    )
}