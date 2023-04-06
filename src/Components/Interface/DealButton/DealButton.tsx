import useDeal from "./useDeal";

export default function DealButton() {
    const { handleDeal } = useDeal();

    return (
        <button type="button" className="UI--button UI--deal-button" onClick={handleDeal}>
            Deal
        </button>
    )
}