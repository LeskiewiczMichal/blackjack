// Types
import { RootState } from "store/store";
// Libraries
import { createAsyncThunk } from "@reduxjs/toolkit";
// Functions
import { incrementBet } from "store/Reducers/tableReducer";
import { playerDrawCard } from "store/Actions/playerUtils";
import { finishGame } from "store/Actions/finishGame";

export const doubleDown = createAsyncThunk(
    'player/doubleDown',
    async (_, { getState, dispatch }) => {
        const state = getState() as RootState;
        await dispatch(incrementBet(state.table.currentBet));
        await dispatch(playerDrawCard());
        await dispatch(finishGame());
    }
);