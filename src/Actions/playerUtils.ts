import { Card } from "types";
import { RootState } from "store/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { drawCard } from "store/reducers/tableReducer";
import { addCard, setPlayerScore } from "store/reducers/playerReducer";
import { calculateScore } from "utils/calculateScore";

// Get's a random card from the deck on the table, adds it to player's hand and updates the score
const playerDrawCard = createAsyncThunk(
  "player/drawCard",
  async (_, { getState, dispatch }): Promise<void> => {
    let state = getState() as RootState;
    const randomCard: Card =
      state.table.cards[Math.floor(Math.random() * state.table.cards.length)]; // Get a random card from the deck
    await dispatch(drawCard(randomCard));
    await dispatch(addCard(randomCard));

    state = getState() as RootState;
    await dispatch(
      setPlayerScore(calculateScore({ cards: state.player.cards })),
    );

    // eslint-disable-next-line no-promise-executor-return
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for animation to end
  },
);

export { playerDrawCard };
