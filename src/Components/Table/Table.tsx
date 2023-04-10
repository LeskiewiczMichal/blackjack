import "./table.style.css";
import { RootState } from "store/store";
import { PlayerType } from "types.d";
import { useSelector } from "react-redux";
import CardsContainer from "components/table/cardsContainer/CardsContainer";
import PointsDisplay from "components/table/pointsDisplay/PointsDisplay";
import InsurancePopup from "components/interface/insurancePopUp/InsurancePopup";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function Table() {
  const player = useSelector((state: RootState) => state.player);
  const dealer = useSelector((state: RootState) => state.dealer);
  const table = useSelector((state: RootState) => state.table);
  const [parent] = useAutoAnimate();

  let popUpJSX: JSX.Element | null;

  if (table.popUpActive) {
    popUpJSX = <InsurancePopup />;
  } else {
    popUpJSX = null;
  }

  return (
    <main className="table--container table-texture" ref={parent}>
      {table.inGame ? (
        <>
          {/* <PointsDisplay score={dealer.score} player={PlayerType.DEALER} /> */}
          <section className="table--player">
            {/* {table.inGame ? (   */}
            <PointsDisplay score={dealer.score} player={PlayerType.DEALER} />
            {/* ) : null} */}
            <CardsContainer cards={dealer.cards} />
          </section>
          {popUpJSX}
          <section className="table--player">
            {/* {table.inGame ? ( */}
            <PointsDisplay score={player.score} player={PlayerType.PLAYER} />
            {/* ) : null} */}
            <CardsContainer cards={player.cards} />
          </section>
        </>
      ) : null}
      {player.secondHand.length > 0 && player.secondScore != null ? (
        <section className="table--player table--second">
          <PointsDisplay
            score={player.secondScore}
            player={PlayerType.PLAYER}
          />
          <CardsContainer cards={player.secondHand} />
        </section>
      ) : null}
    </main>
  );
}
