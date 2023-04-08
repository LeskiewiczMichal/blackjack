import "./pointsDisplay.style.css";

// Types
import { DealerState, PlayerState } from "types";

type PointsDisplayProps = {
  score: number;
};

export default function PointsDisplay(props: PointsDisplayProps) {
  return (
    <div className="points--display">
      <span>Current Score:</span>
      <span className="points">{props.score}</span>
    </div>
  );
}
