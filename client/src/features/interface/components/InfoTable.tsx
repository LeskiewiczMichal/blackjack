import "./infoTable.scss";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useAppSelector } from "hooks/hooks";

export default function InfoTable() {
  const currentBet: number = useAppSelector((state) => state.table.currentBet);
  const playerBalance: number = useAppSelector((state) => state.player.balance);
  const skin = useAppSelector((state) => state.skins.interfaceBackground);

  const insuranceBet: number | null = useAppSelector(
    (state) => state.table.insuranceBet,
  );
  const [parent] = useAutoAnimate();

  let skinClass = "Default";
  if (skin) {
    skinClass = skin.name;
  }

  let betJSX: JSX.Element;

  if (insuranceBet) {
    betJSX = (
      <div className="InfoTable--Insurance-active">
        <div className="InfoTable--row">
          <span className="InfoTable--text">Current bet:</span>
          <span className="InfoTable--money" ref={parent}>
            {currentBet}$
          </span>
        </div>
        <div className="InfoTable--row">
          <span className="InfoTable--text">Insurance bet:</span>
          <span className="InfoTable--money" ref={parent}>
            {insuranceBet}$
          </span>
        </div>
      </div>
    );
  } else {
    betJSX = (
      <div className="InfoTable--row">
        <span className="InfoTable--text">Current bet:</span>
        <span className="InfoTable--money" ref={parent}>
          {currentBet}$
        </span>
      </div>
    );
  }

  return (
    <div className={`InfoTable--container--${skinClass}`}>
      <div className="InfoTable--row">
        <span className="InfoTable--text">Balance:</span>
        <span className="InfoTable--money" ref={parent}>
          {playerBalance}$
        </span>
      </div>
      {betJSX}
    </div>
  );
}
