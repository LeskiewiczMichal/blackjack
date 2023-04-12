import { Card, TableState, DealerState } from "types";
import { AppThunk } from "store/store";
import { drawCard } from "store/reducers/tableReducer";
import { addCard, setDealerScore } from "store/reducers/dealerReducer";
import { calculateScore } from "utils/calculateScore";

// Get's a random card from the deck on the table, adds it to dealer's hand and updates the score
const dealerDrawCard = (): AppThunk => async (dispatch, getState) => {
  const { cards: tableCards } = getState().table as TableState;
  let { cards: dealerCards } = getState().dealer as DealerState;

  let randomCard: Card =
    tableCards[Math.floor(Math.random() * tableCards.length)]; // Get a random card from the deck
  await dispatch(drawCard(randomCard));

  // If it's the first card, hide it
  if (dealerCards.length === 0) {
    randomCard = { ...randomCard, faceUp: false };
  }
  await dispatch(addCard(randomCard));

  ({ cards: dealerCards } = getState().dealer as DealerState);
  await dispatch(setDealerScore(calculateScore({ cards: dealerCards })));

  // eslint-disable-next-line no-promise-executor-return
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for animation to end
};

const dealerDrawUntillSeventeen =
  (): AppThunk => async (dispatch, getState) => {
    let { score: dealerScore } = getState().dealer as DealerState;
    while (dealerScore < 17) {
      await dispatch(dealerDrawCard());
      ({ score: dealerScore } = getState().dealer as DealerState);
    }
  };

export { dealerDrawCard, dealerDrawUntillSeventeen };
