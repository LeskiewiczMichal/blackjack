import { useAppSelector } from "Hooks/hooks"
import isButtonActive from "./isButtonActive"

export default function DoubleDownButton() {
    const playerCards = useAppSelector(state => state.player.cards);

    let buttonActive: boolean = isButtonActive({ cards: playerCards });

    


    return (
        <button type="button"
            className={`UI--button UI--doubleDown-button ${buttonActive ? '' : 'UI--button-disabled'}`}
            // onClick=
        >
            Double Down
        </button>
    )
}