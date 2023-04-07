// Types
import { PlayerState, Card } from "types";

// Libraries
import { createSlice, PayloadAction } from "@reduxjs/toolkit"


const initialState: PlayerState = {
    cards: [],
    score: 0,
    balance: 1000,
};

export const playerSlice = createSlice({
    name: "player",
    initialState: initialState,
    reducers: {
        addCard: (state, action: PayloadAction<Card>) => {
            state.cards.push(action.payload);
        },
        setPlayerScore: (state, action: PayloadAction<number>) => {
            state.score = action.payload;
        },
        setBalance: (state, action: PayloadAction<number>) => {
            state.balance = action.payload;
        },
        clearPlayerCards: (state) => {
            state.cards = [];
        }
    },

})

export const { addCard, setPlayerScore, setBalance, clearPlayerCards } = playerSlice.actions;

export default playerSlice.reducer;