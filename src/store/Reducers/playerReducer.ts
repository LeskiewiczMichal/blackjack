import { PlayerState } from "../../types";
import { createSlice } from "@reduxjs/toolkit"

import { Card } from "../../types";

const initialState: PlayerState = {
    cards: [],
    score: 0,
    balance: 1000,
};

export const playerSlice = createSlice({
    name: "player",
    initialState: initialState,
    reducers: {
        addCard: (state, action) => {
            const card: Card = action.payload;
            console.log(card);
            state.score += card.value;
            state.cards.push(card);
        }
    }

})

export const { addCard } = playerSlice.actions;

export default playerSlice.reducer;