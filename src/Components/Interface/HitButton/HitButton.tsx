import useHit from "./useHit"

export default function HitButton() {
    const { handleHit } = useHit();

    return (
        <button type="button" className="UI--button UI--hit-button" onClick={handleHit}>
            Hit
        </button>
    )
}