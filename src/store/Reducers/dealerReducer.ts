// Types
import { DealerState, Card } from "types.d";

// Libraries
import { PayloadAction, createSlice } from "@reduxjs/toolkit"


const initialState: DealerState = {
    cards: [],
    score: 0,
};

export const dealerSlice = createSlice({
    name: "dealer",
    initialState: initialState,
    reducers: {
        addCard: (state, action: PayloadAction<Card>) => {
            state.cards.push(action.payload)
        },
        showCards: (state) => {
            const card: Card = state.cards[0];
            card.faceUp = true;
            state.cards[0] = card;
            state.score += card.value;
        },
        clearDealerCards: (state) => {
            state.cards = [];
        },
        setDealerScore: (state, action: PayloadAction<number>) => {
            state.score = action.payload;
        }
    },

})

export const { addCard, showCards, clearDealerCards, setDealerScore } = dealerSlice.actions;

export default dealerSlice.reducer;