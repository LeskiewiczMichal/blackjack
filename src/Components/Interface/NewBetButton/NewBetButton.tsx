import useNewBet from "./useNewBet"
import { useAppDispatch } from "Hooks/hooks"
import { clearTable } from "store/Actions/clearTable"

export default function NewBetButton() {
    // const { handleNewBet } = useNewBet()
    const dispatch = useAppDispatch()

    const handleClick = () => {
        dispatch(clearTable())
    }

    return (
        <button type="button" className="UI--button UI--deal-button" onClick={handleClick}>
            New Bet
        </button>
    )
}