import { DealerState } from "../../types";
import { createSlice } from "@reduxjs/toolkit"

import { Card } from "../../types";
import { calculateScore } from "./Functions/calculateScore";
import { addCardHandler } from "./Functions/addCardHandler";

const initialState: DealerState = {
    cards: [],
    score: 0,
};

export const dealerSlice = createSlice({
    name: "dealer",
    initialState: initialState,
    reducers: {
        addCard: (state, action) => {
            state.cards = addCardHandler({ cards: state.cards }, action.payload);
            state.score = calculateScore({ cards: state.cards });
        }
    }

})

export const { addCard } = dealerSlice.actions;

export default dealerSlice.reducer;