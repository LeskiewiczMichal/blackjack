import { Card } from "types";
import { RootState } from "store/store";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Functions
import { drawCard } from "store/Reducers/tableReducer";
import { addCard, setDealerScore } from "store/Reducers/dealerReducer";
import { calculateScore } from "store/Reducers/Functions/calculateScore";

export const dealerDrawCard = createAsyncThunk(
    'player/drawCard',
    async (_, { getState, dispatch }) => {
        let state = getState() as RootState;
        console.log("Dealer Score: " + state.dealer.score);
        let randomCard: Card = state.table.cards[Math.floor(Math.random() * state.table.cards.length)];
        await dispatch(drawCard(randomCard));
        if (state.dealer.cards.length === 0) {
            randomCard = { ...randomCard, faceUp: false };
        }
        await dispatch(addCard(randomCard));
        state = getState() as RootState;
        await dispatch(setDealerScore(calculateScore({ cards: state.dealer.cards })));
    }
);
