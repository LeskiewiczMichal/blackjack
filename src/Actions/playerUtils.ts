// Types
import { Card } from "types";
import { RootState } from "store/store";

// Libraries
import { createAsyncThunk } from "@reduxjs/toolkit";

// Functions
import { drawCard } from "store/Reducers/tableReducer";
import { addCard, setPlayerScore } from "store/Reducers/playerReducer";
import { calculateScore } from "Functions/calculateScore";
// import { hasBlackJack } from "store/Reducers/Functions/hasBlackJack";

// Get's a random card from the deck on the table, adds it to player's hand and updates the score
export const playerDrawCard = createAsyncThunk(
  "player/drawCard",
  async (_, { getState, dispatch }) => {
    let state = getState() as RootState;
    const randomCard: Card =
      state.table.cards[Math.floor(Math.random() * state.table.cards.length)]; // Get a random card from the deck
    await dispatch(drawCard(randomCard));
    await dispatch(addCard(randomCard));

    state = getState() as RootState;
    await dispatch(
      setPlayerScore(calculateScore({ cards: state.player.cards })),
    );
  },
);
