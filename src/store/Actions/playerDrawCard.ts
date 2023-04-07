import { Card } from "types";
import { RootState } from "store/store";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Functions
import { drawCard } from "store/Reducers/tableReducer";
import { addCard, setPlayerScore } from "store/Reducers/playerReducer";
import { calculateScore } from "Components/Interface/Functions/calculateScore";

export const playerDrawCard = createAsyncThunk(
    'player/drawCard',
    async (_, { getState, dispatch }) => {
        const state = getState() as RootState;
        const randomCard: Card = state.table.cards[Math.floor(Math.random() * state.table.cards.length)];
        dispatch(drawCard(randomCard));
        dispatch(addCard(randomCard));
        dispatch(setPlayerScore(calculateScore({ oldScore: state.player.score, newCard: randomCard })));
    }
);
