import "./pointsDisplay.style.css";

type PointsDisplayProps = {
  score: number;
};

export default function PointsDisplay(props: PointsDisplayProps) {
  const { score } = props;

  return (
    <div className="points--display">
      <span>Current Score:</span>
      <span className="points">{score}</span>
    </div>
  );
}
