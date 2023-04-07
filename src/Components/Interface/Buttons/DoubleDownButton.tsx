// Libraries
import { useAppSelector, useAppDispatch } from "Hooks/hooks"
// Functions
import { doubleDown } from "store/Actions/doubleDown"


export default function DoubleDownButton() {
    const dispatch = useAppDispatch();
    const playerCards = useAppSelector(state => state.player.cards);

    const isDisabled: boolean = playerCards.length !== 2;

    const handleClick = () => {
            dispatch(doubleDown());
    }

    return (
        <button type="button"
            className={`UI--button UI--doubleDown-button ${isDisabled ? 'UI--button-disabled' : ''}`}
            onClick={handleClick}
            disabled={isDisabled}
        >
            Double Down
        </button>
    )
}