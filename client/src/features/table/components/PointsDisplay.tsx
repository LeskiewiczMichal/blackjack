import "./pointsDisplay.style.css";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import { PlayerType } from "types.d";
import { useAppSelector } from "hooks/hooks";

type PointsDisplayProps = {
  score: number;
  player: PlayerType;
};

export default function PointsDisplay(props: PointsDisplayProps) {
  const { score, player } = props;
  const [parent] = useAutoAnimate();
  const skin = useAppSelector((state) => state.skins.interfaceBackground);

  let skinClass = "Default";
  if (skin) {
    skinClass = skin.name;
  }

  return (
    <div className={`points--display--${skinClass}`} ref={parent}>
      <span>
        {player === PlayerType.PLAYER ? "Your" : "Dealer's"} Current Score:
      </span>
      <span className="points">{score}</span>
    </div>
  );
}
