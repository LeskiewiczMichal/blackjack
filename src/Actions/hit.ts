// Types
import { RootState } from "store/store";
// Libraries
import { createAsyncThunk, unwrapResult } from "@reduxjs/toolkit";
// Functions
import { playerDrawCard } from "Actions/playerUtils";
import { finishGame } from "Actions/gameState";
import { playerDidSplit, switchHands } from "./split";

// Draw a card for the player
export const hit = createAsyncThunk(
  "player/hit",
  async (_, { getState, dispatch }) => {
    await dispatch(playerDrawCard());
    const state = getState() as RootState;

    // If player score is over 21, hand is lost
    if (state.player.score > 21) {
      const splitActive: boolean = unwrapResult(
        await dispatch(playerDidSplit()),
      );
      if (splitActive) {
        dispatch(switchHands()); // If player has split, switch to second hand
      } else {
        dispatch(finishGame()); // If player has not split, end game
      }
    }
  },
);
