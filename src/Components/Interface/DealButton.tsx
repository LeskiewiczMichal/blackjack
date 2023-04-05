import { useDispatch } from "react-redux"
import { deal } from "../../store/Reducers/tableReducer"


export default function DealButton() {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(deal());
    }

    return (
        <button type="button" className="UI--button UI--deal-button" onClick={handleClick}>
            Deal
        </button>
    )
}