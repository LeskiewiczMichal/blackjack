import "./pointsDisplay.style.css"
import { DealerState, PlayerState, CardValue, Card } from "types"


type PointsDisplayProps = {
    player: DealerState | PlayerState,
}

export default function PointsDisplay(props: PointsDisplayProps) {
    const { player } = props;

    return (
        <div className="points--display"><span>Current Score:</span><span className="points">{player.score}</span></div>
    )
}