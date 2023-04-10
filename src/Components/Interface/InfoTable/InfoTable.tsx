import { useAutoAnimate } from "@formkit/auto-animate/react";
import "./infoTable.style.css";
import { useAppSelector } from "Hooks/hooks";

export default function InfoTable() {
  const currentBet: number = useAppSelector((state) => state.table.currentBet);
  const playerBalance: number = useAppSelector((state) => state.player.balance);
  const insuranceBet: number | null = useAppSelector(
    (state) => state.table.insuranceBet,
  );
  const [parent] = useAutoAnimate();

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
    <div className="InfoTable--container">
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
