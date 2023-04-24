import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { DealerState, Card } from "types.d";
import { calculateScore } from "utils/calculateScore";

const initialState: DealerState = {
  cards: [],
  score: 0,
};

export const dealerSlice = createSlice({
  name: "dealer",
  initialState,
  reducers: {
    addCard: (state, action: PayloadAction<Card>) => {
      state.cards.push(action.payload);
    },
    showCards: (state) => {
      const card: Card = state.cards[0];
      card.faceUp = true;
      state.cards[0] = card;
      state.score = calculateScore({ cards: state.cards });
    },
    clearDealerCards: (state) => {
      state.cards = [];
    },
    setDealerScore: (state, action: PayloadAction<number>) => {
      state.score = action.payload;
    },
  },
});

export const { addCard, showCards, clearDealerCards, setDealerScore } =
  dealerSlice.actions;

export default dealerSlice.reducer;
