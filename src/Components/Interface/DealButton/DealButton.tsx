import useDeal from "./useDeal";

export default function DealButton() {
    const { handleDeal } = useDeal();

    const handleClick = () => {
        handleDeal();
        // handleCheckResult();
    }

    return (
        <button type="button" className="UI--button UI--deal-button" onClick={handleClick}>
            Deal
        </button>
    )
}