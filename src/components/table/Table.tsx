import "./table.style.css";
import { PlayerType } from "types.d";
import { useAppSelector, useAppDispatch } from "hooks/hooks";
import CardsContainer from "components/table/cardsContainer/CardsContainer";
import PointsDisplay from "components/table/pointsDisplay/PointsDisplay";
import InsurancePopup from "components/interface/insurancePopUp/InsurancePopup";
import { generateCards } from "utils/generateCards";
import { setCards } from "store/reducers/tableReducer";
import { useEffect } from "react";

export default function Table() {
  const dispatch = useAppDispatch();
  const player = useAppSelector((state) => state.player);
  const dealer = useAppSelector((state) => state.dealer);
  const popUpActive = useAppSelector((state) => state.table.popUpActive);
  const inGame = useAppSelector((state) => state.table.inGame);
  const cards = useAppSelector((state) => state.table.cards);

  useEffect(() => {
    if (cards.length <= 0) {
      const newCards = generateCards();
      dispatch(setCards(newCards));
    }
  }, [cards, dispatch]);

  let popUpJSX: JSX.Element | null;

  if (popUpActive) {
    popUpJSX = <InsurancePopup />;
  } else {
    popUpJSX = null;
  }

  return (
    <main className="table--container table-texture">
      {inGame ? (
        <>
          <section className="table--player">
            <PointsDisplay score={dealer.score} player={PlayerType.DEALER} />
            <CardsContainer cards={dealer.cards} player={PlayerType.DEALER} />
          </section>
          {popUpJSX}
          <section className="table--player">
            <PointsDisplay score={player.score} player={PlayerType.PLAYER} />
            <CardsContainer cards={player.cards} player={PlayerType.PLAYER} />
          </section>
        </>
      ) : null}
      {player.secondHand.length > 0 && player.secondScore != null ? (
        <section className="table--player table--second">
          <PointsDisplay
            score={player.secondScore}
            player={PlayerType.PLAYER}
          />
          <CardsContainer
            cards={player.secondHand}
            player={PlayerType.PLAYER}
          />
        </section>
      ) : null}
    </main>
  );
}
