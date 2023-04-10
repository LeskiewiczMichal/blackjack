import { Card } from "types";
import { RootState } from "store/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { drawCard } from "store/Reducers/tableReducer";
import { addCard, setDealerScore } from "store/Reducers/dealerReducer";
import { calculateScore } from "Functions/calculateScore";

// Get's a random card from the deck on the table, adds it to dealer's hand and updates the score
const dealerDrawCard = createAsyncThunk(
  "player/drawCard",
  async (_, { getState, dispatch }) => {
    let state = getState() as RootState;
    let randomCard: Card =
      state.table.cards[Math.floor(Math.random() * state.table.cards.length)]; // Get a random card from the deck
    await dispatch(drawCard(randomCard));

    // If it's the first card, hide it
    if (state.dealer.cards.length === 0) {
      randomCard = { ...randomCard, faceUp: false };
    }
    await dispatch(addCard(randomCard));

    state = getState() as RootState;
    await dispatch(
      setDealerScore(calculateScore({ cards: state.dealer.cards })),
    );

    // eslint-disable-next-line no-promise-executor-return
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for animation to end
  },
);

const dealerDrawUntillSeventeen = createAsyncThunk(
  "player/drawUntillSeventeen",
  async (_, { getState, dispatch }) => {
    let state = getState() as RootState;
    while (state.dealer.score < 17) {
      await dispatch(dealerDrawCard());
      state = getState() as RootState;
    }
  },
);

export { dealerDrawCard, dealerDrawUntillSeventeen };
