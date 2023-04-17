import "./pointsDisplay.style.css";
import { PlayerType } from "types.d";
import { useAutoAnimate } from "@formkit/auto-animate/react";

type PointsDisplayProps = {
  score: number;
  player: PlayerType;
};

export default function PointsDisplay(props: PointsDisplayProps) {
  const { score, player } = props;
  const [parent] = useAutoAnimate();

  return (
    <div className="points--display" ref={parent}>
      <span>
        {player === PlayerType.PLAYER ? "Your" : "Dealer's"} Current Score:
      </span>
      <span className="points">{score}</span>
    </div>
  );
}
