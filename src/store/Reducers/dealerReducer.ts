import { DealerState, Card, CardSuit } from "types.d";
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { calculateScore } from "./Functions/calculateScore";
import { addCardHandler } from "./Functions/addCardHandler";
import { dealerDrawCard } from "./Functions/dealerDrawCard";
import { newBet } from "./tableReducer";
// import { store } from "store/store";



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
            // const reduxStore = store.getState();
        },
        clearDealer: (state) => {
            state.cards = [];
            state.score = 0;
        },
        drawTill17: (state, action) => {
            if (state.score < 17) {
                console.log(state.score);
            }
        },
        clearDealerCards: (state) => {
            state.cards = [];
        },
        setDealerScore: (state, action: PayloadAction<number>) => {
            state.score = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // .addCase(finishGame, (state) => {
            //     const card: Card = state.cards[0];
            //     card.faceUp = true;
            //     state.cards[0] = card;
            //     state.score += card.value;
            // })
            .addCase(newBet, (state) => {
                state.cards = [];
                state.score = 0;
            })
    }

})

export const { addCard, showCards, clearDealer, clearDealerCards, setDealerScore } = dealerSlice.actions;

export default dealerSlice.reducer;