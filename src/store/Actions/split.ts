// Types
import { Card } from "types.d";
import { RootState } from "store/store";
// Libraries
import { createAsyncThunk } from "@reduxjs/toolkit";
// Functions
import { setPlayerCards, setPlayerScore, addSecondHandCard } from "store/Reducers/playerReducer";
import { calculateScore } from "store/Reducers/Functions/calculateScore";
import { playerDrawCard } from "./playerUtils";

export const split = createAsyncThunk(
    "player/split",
    async (_, { getState, dispatch }) => {
        let state = getState() as RootState;
        const fistCard = state.player.cards[0];
        const secondCard = state.player.cards[1];

        // First hand
        const newCards: Card[] = [fistCard];
        await dispatch(setPlayerCards(newCards));
        await dispatch(setPlayerScore(calculateScore({ cards: newCards})));
        await dispatch(playerDrawCard());

        
        // Second hand
        await dispatch(addSecondHandCard(secondCard));

    }
);
