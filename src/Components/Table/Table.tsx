import "./table.style.css";
import { RootState } from "store/store";
import { PlayerType } from "types.d";
import { useSelector } from "react-redux";
import CardsContainer from "Components/Table/CardsContainer/CardsContainer";
import PointsDisplay from "Components/Table/PointsDisplay/PointsDisplay";
import InsurancePopup from "Components/Interface/InsurancePopUp/InsurancePopup";

export default function Table() {
  const player = useSelector((state: RootState) => state.player);
  const dealer = useSelector((state: RootState) => state.dealer);
  const table = useSelector((state: RootState) => state.table);

  let popUpJSX: JSX.Element | null;

  if (table.popUpActive) {
    popUpJSX = <InsurancePopup />;
  } else {
    popUpJSX = null;
  }

  return (
    <main className="table--container table-texture">
      {table.inGame ? (
        <>
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
