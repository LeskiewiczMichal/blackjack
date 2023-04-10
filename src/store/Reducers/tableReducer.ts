// Types
import { TableState, Card } from "types.d";

// Libraries
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// Functions
import { generateCards } from "utils/generateCards";
import { showCards } from "store/reducers/dealerReducer";

/// NOTE: When cards run out, should refill the deck;

// Initial decks of cards
const cards = generateCards();

const initialState: TableState = {
  currentBet: 0,
  cards,
  inGame: false,
  gameFinished: false,
  popUpActive: false,
  insuranceBet: null,
  animationOn: false,
};

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    incrementBet: (state, action: PayloadAction<number>) => {
      state.currentBet += action.payload;
    },
    clearBet: (state) => {
      state.currentBet = 0;
    },
    drawCard: (state, action: PayloadAction<Card>) => {
      // Remove card given in action form the deck
      state.cards.splice(state.cards.indexOf(action.payload), 1);
    },
    setGameFinished: (state, action: PayloadAction<boolean>) => {
      state.gameFinished = action.payload;
    },
    setInGame: (state, action: PayloadAction<boolean>) => {
      state.inGame = action.payload;
    },
    setPopUpActive: (state, action: PayloadAction<boolean>) => {
      state.popUpActive = action.payload;
    },
    setInsuranceBet: (state, action: PayloadAction<number | null>) => {
      state.insuranceBet = action.payload;
    },
    setAnimationOn: (state, action: PayloadAction<boolean>) => {
      state.animationOn = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(showCards, (state) => {
      state.gameFinished = true;
    });
  },
});

export const {
  incrementBet,
  clearBet,
  drawCard,
  setGameFinished,
  setInGame,
  setPopUpActive,
  setInsuranceBet,
  setAnimationOn,
} = tableSlice.actions;

export default tableSlice.reducer;
