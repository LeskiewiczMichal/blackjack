import { RootState } from "store/store";
import { createAsyncThunk, unwrapResult } from "@reduxjs/toolkit";
import { playerDrawCard } from "Actions/playerUtils";
import { finishGame } from "Actions/gameState";
import { playerDidSplit, switchHands } from "Actions/split";

// Draw a card for the player
const hit = createAsyncThunk(
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
        dispatch(switchHands());
      } else {
        dispatch(finishGame());
      }
    }
  },
);

export { hit };
