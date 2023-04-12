import { Card, TableState, PlayerState } from "types";
import { AppThunk } from "store/store";
import { drawCard } from "store/reducers/tableReducer";
import { addCard, setPlayerScore } from "store/reducers/playerReducer";
import { calculateScore } from "utils/calculateScore";

// Get's a random card from the deck on the table, adds it to player's hand and updates the score
const playerDrawCard = (): AppThunk => async (dispatch, getState) => {
  const { cards } = getState().table as TableState;

  const randomCard: Card = cards[Math.floor(Math.random() * cards.length)]; // Get a random card from the deck
  await dispatch(drawCard(randomCard));
  await dispatch(addCard(randomCard));

  const { cards: playerCards } = getState().player as PlayerState;
  await dispatch(setPlayerScore(calculateScore({ cards: playerCards })));

  // eslint-disable-next-line no-promise-executor-return
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for animation to end
};

export { playerDrawCard };
