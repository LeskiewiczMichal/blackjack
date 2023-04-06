import { DealerState } from "../../types";
import { createSlice } from "@reduxjs/toolkit"

import { Card } from "../../types";
import { calculateScore } from "./Functions/calculateScore";
import { addCardHandler } from "./Functions/addCardHandler";
import { playerLost } from "./playerReducer";

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
        },
        showCards: (state) => {
            const card: Card = state.cards[0];
            card.faceUp = true;
            state.cards[0] = card;
            state.score += card.value;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(playerLost, (state, action) => {
                state.cards = [];
                state.score = 0;
            })
    }

})

export const { addCard, showCards } = dealerSlice.actions;

export default dealerSlice.reducer;