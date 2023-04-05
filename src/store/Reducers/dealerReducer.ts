import { DealerState } from "../../types";
import { createSlice } from "@reduxjs/toolkit"

import { Card } from "../../types";

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
            state.score += card.value;
            state.cards.push(card);        }
    }

})

export const { addCard } = dealerSlice.actions;

export default dealerSlice.reducer;