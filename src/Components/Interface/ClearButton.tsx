import { useDispatch } from "react-redux"
import { clearBet } from "../../store/Reducers/tableReducer"

export default function ClearButton() {
    const dispatch = useDispatch();

    return (
        <button type="button" className="UI--button UI--clear-button" onClick={() => dispatch(clearBet())}>
            Clear
        </button>
    )
}