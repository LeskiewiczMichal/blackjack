import "./pointsDisplay.style.css"

// Types
import { DealerState, PlayerState } from "types"


type PointsDisplayProps = {
    player: DealerState | PlayerState,
}

export default function PointsDisplay(props: PointsDisplayProps) {
    const { player } = props;

    return (
        <div className="points--display">
            <span>Current Score:</span>
            <span className="points">{player.score}</span>
        </div>
    )
}