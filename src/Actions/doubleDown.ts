import { RootState } from "store/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { incrementBet } from "store/reducers/tableReducer";
import { playerDrawCard } from "actions/playerUtils";
import { finishGame } from "actions/gameState";

const doubleDown = createAsyncThunk(
  "player/doubleDown",
  async (_, { getState, dispatch }): Promise<void> => {
    const state = getState() as RootState;
    await dispatch(incrementBet(state.table.currentBet));
    await dispatch(playerDrawCard());
    await dispatch(finishGame());
  },
);

export { doubleDown };
