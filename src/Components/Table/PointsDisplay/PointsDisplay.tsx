import "./pointsDisplay.style.css";
import { PlayerType } from "types.d";

type PointsDisplayProps = {
  score: number;
  player: PlayerType;
};

export default function PointsDisplay(props: PointsDisplayProps) {
  const { score, player } = props;

  return (
    <div className="points--display">
      <span>
        {player === PlayerType.PLAYER ? "Your" : "Dealer's"} Current Score:
      </span>
      <span className="points">{score}</span>
    </div>
  );
}
