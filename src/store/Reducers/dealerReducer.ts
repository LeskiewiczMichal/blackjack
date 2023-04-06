import { DealerState } from "../../types";
import { createSlice } from "@reduxjs/toolkit"

import { Card } from "../../types";
import { calculateScore } from "./Functions/calculateScore";

const initialState: DealerState = {
    cards: [],
    score: 0,
};

export const dealerSlice = createSlice({
    name: "dealer",
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

export const { addCard } = dealerSlice.actions;

export default dealerSlice.reducer;