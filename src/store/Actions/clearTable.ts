import { createAsyncThunk } from "@reduxjs/toolkit";

import { setInGame, setGameFinished, clearBet } from "store/Reducers/tableReducer";
import { clearPlayerCards, setPlayerScore } from "store/Reducers/playerReducer";
import { clearDealerCards, setDealerScore } from "store/Reducers/dealerReducer";

export const clearTable = createAsyncThunk(
    'table/clearTable',
    async (_, { dispatch }) => {
        // Clear table
        dispatch(setInGame(false));
        dispatch(setGameFinished(false));
        dispatch(clearBet());

        // Clear playerr
        dispatch(clearPlayerCards());
        dispatch(setPlayerScore(0));

        // Clear dealer
        dispatch(clearDealerCards());
        dispatch(setDealerScore(0));
    }
);