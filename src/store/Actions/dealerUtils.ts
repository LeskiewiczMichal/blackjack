// Types
import { Card, CardValue } from "types";
import { RootState } from "store/store";

// Libraries
import { createAsyncThunk } from "@reduxjs/toolkit";

// Functions
import { drawCard } from "store/Reducers/tableReducer";
import { addCard, setDealerScore } from "store/Reducers/dealerReducer";
import { calculateScore } from "store/Reducers/Functions/calculateScore";

// Get's a random card from the deck on the table, adds it to dealer's hand and updates the score
export const dealerDrawCard = createAsyncThunk(
    'player/drawCard',
    async (_, { getState, dispatch }) => {
        let state = getState() as RootState;
        let randomCard: Card = state.table.cards[Math.floor(Math.random() * state.table.cards.length)]; // Get a random card from the deck
        await dispatch(drawCard(randomCard));

        // If it's the first card, hide it
        if (state.dealer.cards.length === 0) {
            randomCard = { ...randomCard, faceUp: false };
        }
        await dispatch(addCard(randomCard));

        state = getState() as RootState;
        await dispatch(setDealerScore(calculateScore({ cards: state.dealer.cards })));
    }
);


export const dealerDrawUntillSeventeen = createAsyncThunk(
    'player/drawUntillSeventeen',
    async (_, { getState, dispatch }) => {
        let state = getState() as RootState;
        while (state.dealer.score < 17) {
            await dispatch(dealerDrawCard());
            state = getState() as RootState;
        }
    }
);


// export const onlyAceVisible = createAsyncThunk(
//     'player/onlyAceVisible',
//     async (_, { getState, dispatch }) => {
//         let state = getState() as RootState;
//         if (state.dealer.cards.length !== 2) {
//             return false;
//         }
//         for (const card of state.dealer.cards) {
//             if (card.value === CardValue.ACE && card.faceUp) {
//                 return true;
//             }
//         }
//         return false;
//     }
// );