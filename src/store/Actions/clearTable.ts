// Libraries
import { createAsyncThunk } from "@reduxjs/toolkit";

// Functions
import { setInGame, setGameFinished, clearBet } from "store/Reducers/tableReducer";
import { clearPlayerCards, setPlayerScore, setSecondScore, setSecondHand } from "store/Reducers/playerReducer";
import { clearDealerCards, setDealerScore } from "store/Reducers/dealerReducer";

export const clearTable = createAsyncThunk(
    'table/clearTable',
    async (_, { dispatch }) => {
        // Clear table
        await dispatch(setInGame(false));
        await dispatch(setGameFinished(false));
        await dispatch(clearBet());

        // Clear player
        await dispatch(clearPlayerCards());
        await dispatch(setPlayerScore(0));
        await dispatch(setSecondScore(null));
        await dispatch(setSecondHand([]));

        // Clear dealer
        await dispatch(clearDealerCards());
        await dispatch(setDealerScore(0));
    }
);