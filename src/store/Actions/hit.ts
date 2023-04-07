// Types
import { RootState } from "store/store";

// Libraries
import { createAsyncThunk, unwrapResult } from "@reduxjs/toolkit";

// Functions
import { playerDrawCard } from "store/Actions/playerUtils";
import { finishGame } from "store/Actions/finishGame";
import { playerDidSplit, switchHands } from "./split";

// Draw a card for the player
export const hit = createAsyncThunk(
  "player/hit",
  async (_, { getState, dispatch }) => {
    await dispatch(playerDrawCard());
    const state = getState() as RootState;

    // If player score is over 21, player has lost

    if (state.player.score > 21) {
      const splitActive: boolean = unwrapResult(
        await dispatch(playerDidSplit())
      );
      if (splitActive) {
        dispatch(switchHands());
      } else {
        dispatch(finishGame());
      }
    }
  }
);
