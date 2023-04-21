import { PlayerState, Card } from "types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginSuccess } from "./authReducer";

const initialState: PlayerState = {
  cards: [],
  score: 0,
  secondScore: null,
  balance: 1000,
  secondHand: [],
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    addCard: (state, action: PayloadAction<Card>) => {
      state.cards.push(action.payload);
    },
    setPlayerScore: (state, action: PayloadAction<number>) => {
      state.score = action.payload;
    },
    setBalance: (state, action: PayloadAction<number>) => {
      state.balance = action.payload;
    },
    clearPlayerCards: (state) => {
      state.cards = [];
    },
    setPlayerCards: (state, action: PayloadAction<Card[]>) => {
      state.cards = action.payload;
    },
    addSecondHandCard: (state, action: PayloadAction<Card>) => {
      state.secondHand.push(action.payload);
    },
    setSecondHand: (state, action: PayloadAction<Card[]>) => {
      state.secondHand = action.payload;
    },
    setSecondScore: (state, action: PayloadAction<number | null>) => {
      state.secondScore = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      loginSuccess,
      (state, action: PayloadAction<{ username: string; balance: number }>) => {
        state.balance = action.payload.balance;
      },
    );
  },
});

export const {
  addCard,
  setPlayerScore,
  setBalance,
  clearPlayerCards,
  setPlayerCards,
  addSecondHandCard,
  setSecondHand,
  setSecondScore,
} = playerSlice.actions;

export default playerSlice.reducer;
