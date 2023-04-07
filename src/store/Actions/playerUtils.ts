import { Card } from "types";
import { RootState } from "store/store";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Functions
import { drawCard } from "store/Reducers/tableReducer";
import { addCard, setPlayerScore } from "store/Reducers/playerReducer";
import { calculateScore } from "store/Reducers/Functions/calculateScore";

export const playerDrawCard = createAsyncThunk(
    'player/drawCard',
    async (_, { getState, dispatch }) => {
        let state = getState() as RootState;
        console.log("player score:" + state.player.score);
        const randomCard: Card = state.table.cards[Math.floor(Math.random() * state.table.cards.length)];
        await dispatch(drawCard(randomCard));
        await dispatch(addCard(randomCard));
        state = getState() as RootState;
        await dispatch(setPlayerScore(calculateScore({ cards: state.player.cards})));
    }
);
