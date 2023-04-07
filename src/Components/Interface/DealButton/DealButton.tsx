import useDeal from "./useDeal";
import { makeDeal } from "store/Actions/makeDeal";
import { useAppDispatch } from "Hooks/hooks";

export default function DealButton() {
    const dispatch = useAppDispatch();
    // const { handleDeal } = useDeal();

    const handleClick = () => {
        dispatch(makeDeal());
        // handleCheckResult();
    }

    return (
        <button type="button" className="UI--button UI--deal-button" onClick={handleClick}>
            Deal
        </button>
    )
}