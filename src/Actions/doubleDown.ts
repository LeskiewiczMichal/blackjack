import { RootState } from "store/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { incrementBet } from "store/Reducers/tableReducer";
import { playerDrawCard } from "Actions/playerUtils";
import { finishGame } from "Actions/gameState";

const doubleDown = createAsyncThunk(
  "player/doubleDown",
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    await dispatch(incrementBet(state.table.currentBet));
    await dispatch(playerDrawCard());
    await dispatch(finishGame());
  },
);

export { doubleDown };
