import { RootState } from "store/store";
import { createAsyncThunk, unwrapResult } from "@reduxjs/toolkit";
import { playerDrawCard } from "actions/playerUtils";
import { finishGame } from "actions/gameState";
import { playerDidSplit, switchHands } from "actions/split";

// Draw a card for the player
const hit = createAsyncThunk(
  "player/hit",
  async (_, { getState, dispatch }): Promise<void> => {
    await dispatch(playerDrawCard());

    const state = getState() as RootState;

    // If player score is over 21, hand is lost
    if (state.player.score > 21) {
      const splitActive: boolean = unwrapResult(
        await dispatch(playerDidSplit()),
      );
      if (splitActive) {
        dispatch(switchHands());
      } else {
        dispatch(finishGame());
      }
    }
  },
);

export { hit };
