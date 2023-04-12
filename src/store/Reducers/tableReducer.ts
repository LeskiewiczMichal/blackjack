import { TableState, Card } from "types.d";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { generateCards } from "utils/generateCards";
import { showCards } from "store/reducers/dealerReducer";

// Initial decks of cards
const cards = generateCards();

const initialState: TableState = {
  currentBet: 0,
  cards,
  inGame: false,
  gameFinished: false,
  popUpActive: false,
  insuranceBet: null,
  actionOn: false,
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
    setActionOn: (state, action: PayloadAction<boolean>) => {
      state.actionOn = action.payload;
    },
    setCards: (state, action: PayloadAction<Card[]>) => {
      state.cards = action.payload;
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
  setActionOn,
  setCards,
} = tableSlice.actions;

export default tableSlice.reducer;
