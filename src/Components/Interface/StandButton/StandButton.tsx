import useStand from "./useStand";

export default function StandButton() {
    const { handleStand } = useStand();

    return (
        <button type="button" className="UI--button UI--stand-button" onClick={handleStand}>
            Stand
        </button>
    )
}