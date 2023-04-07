// Types
import { RootState } from "store/store";

// Libraries
import { createAsyncThunk } from "@reduxjs/toolkit";

// Functions
import { setGameFinished, setInGame } from "store/Reducers/tableReducer"
import { playerDrawCard } from "store/Actions/playerUtils";
import { dealerDrawCard } from "store/Actions/dealerUtils";

const NUMBER_OF_CARDS_FOR_EACH_PLAYER = 2;

export const makeDeal = createAsyncThunk(
    'table/deal',
    async (_, { getState, dispatch }) => {
        const state = getState() as RootState;

        // If there is no bet, do nothing
        if (state.table.currentBet === 0) {
            return;
        }

        await dispatch(setGameFinished(false));
        await dispatch(setInGame(true));

        // Draw initial cards for each player
        for (let i = 0; i < NUMBER_OF_CARDS_FOR_EACH_PLAYER; i++) {
            await dispatch(playerDrawCard());
            await dispatch(dealerDrawCard());
        }
    }
);