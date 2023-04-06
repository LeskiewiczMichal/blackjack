import { PlayerState, Card } from "types";
import { createSlice } from "@reduxjs/toolkit"

import { calculateScore } from "store/Reducers/Functions/calculateScore";


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
            state.cards.push(card);
            state.score = calculateScore({ cards: state.cards });
            console.log(state.cards);
        }
    }

})

export const { addCard } = playerSlice.actions;

export default playerSlice.reducer;