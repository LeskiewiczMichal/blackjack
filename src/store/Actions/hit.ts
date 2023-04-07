import { RootState } from "store/store";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { playerDrawCard } from "./playerUtils";
import { finishGame } from "./finishGame";


export const hit = createAsyncThunk(
    'player/hit',
    async (_, { getState, dispatch }) => {
        await dispatch(playerDrawCard());
        const state = getState() as RootState;
        if (state.player.score > 21) {
            await dispatch(finishGame());
        }
    }
);